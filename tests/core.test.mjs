import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHar, sanitizeHar, analyzeHar, createReport, createAiBrief, normalizeSecrets, MAX_ENTRIES, MAX_BYTES } from '../src/core.mjs';
import { DEMO_HAR } from '../src/demo.mjs';

const clone = value => structuredClone(value);
const make = (request = {}, response = {}, entry = {}) => ({ log: { version: '1.2', entries: [{
  startedDateTime: '2026-10-20T01:00:00Z', time: 2500,
  request: { method: 'GET', url: 'https://example.com/api', headers: [], ...request },
  response: { status: 200, headers: [], content: { mimeType: 'application/json', size: 12 }, ...response }, ...entry
}] } });

test('parses a BOM and rejects malformed JSON without echoing private input', () => {
  assert.equal(parseHar(`\uFEFF${JSON.stringify(DEMO_HAR)}`).log.entries.length, 6);
  assert.throws(() => parseHar('secret-personal-data'), error => !error.message.includes('secret-personal-data'));
  assert.throws(() => parseHar('{"log":{}}'), /log.entries/);
  assert.throws(() => parseHar(''), /请输入/);
  assert.throws(() => parseHar(' '.repeat(MAX_BYTES) + 'a'), /20 MiB/);
});
test('rejects malformed entries instead of producing partial safe output', () => {
  assert.throws(() => sanitizeHar({ log: { entries: [{ request: { url: 'https://example.com' } }] } }), /第 1/);
  const tooMany = { log: { entries: new Array(MAX_ENTRIES + 1) } };
  assert.throws(() => sanitizeHar(tooMany), /20,000/);
});
test('rebuilds allowlisted HAR and drops credentials, bodies, cookies and arbitrary metadata', () => {
  const input = make({
    url: 'https://privateuser:privatepass@example.com/orders/482736?token=privatequery&search=privatequery2#privatefragment',
    headers: [{ name: 'Authorization', value: 'Bearer privateheader' }, { name: 'X-Trace', value: 'privatetrace' },
      { name: 'Content-Type', value: 'application/json; boundary=privateboundary' }],
    queryString: [{ name: 'token', value: 'privatequery' }], cookies: [{ name: 'session', value: 'privatecookie' }],
    postData: { text: 'privatebody' }, comment: 'privatecomment'
  }, {
    status: 503, statusText: 'privatestatus', headers: [{ name: 'Set-Cookie', value: 'session=privatecookie; HttpOnly' }],
    cookies: [{ name: 'session', value: 'privatecookie' }],
    content: { mimeType: 'application/json', text: 'privateresponse', encoding: 'base64', size: 12 }, redirectURL: 'https://private.example.com/private'
  }, { _securityDetails: { value: 'privatesecurity' }, serverIPAddress: 'privateip', comment: 'privateentry' });
  input.log.pages = [{ title: 'privatepage' }]; input.log.creator = { name: 'privatecreator' };
  const result = sanitizeHar(input);
  const serialized = JSON.stringify(result);
  for (const value of ['privateuser','privatepass','privatequery','privatequery2','privatefragment','privateheader','privatetrace',
    'privateboundary','privatecookie','privatebody','privatecomment','privatestatus','privateresponse','privatesecurity','privateip','privateentry','privatepage','privatecreator']) {
    assert.ok(!serialized.includes(value), `leaked ${value}`);
  }
  assert.equal(result.har.log.entries[0].response.status, 503);
  assert.equal(result.har.log.entries[0].request.headers[0].value, 'application/json');
  assert.equal(result.stats.removedBodies, 2);
  assert.equal(result.stats.maskedQueryValues, 2);
  assert.equal(result.stats.maskedPathSegments, 1);
});
test('never mutates the source input', () => {
  const original = clone(DEMO_HAR); sanitizeHar(DEMO_HAR);
  assert.deepEqual(DEMO_HAR, original);
});
test('retains query keys, repeats and empty values while hiding all values', () => {
  const result = sanitizeHar(make({ url: 'https://example.com/?page=1&page=2&empty=' }));
  const query = result.har.log.entries[0].request.queryString;
  assert.deepEqual(query, [{ name: 'page', value: '[REDACTED]' }, { name: 'page', value: '[REDACTED]' }, { name: 'empty', value: '' }]);
  assert.equal(result.stats.maskedQueryValues, 2);
});
test('extra secrets use literal matching, including encoded paths and regex punctuation', () => {
  const result = sanitizeHar(make({ url: 'https://example.com/team/Acme%2520Corp/C%2B%2B/A.b%2A' }), { secrets: 'Acme Corp\nC++\nA.b*' });
  const url = decodeURIComponent(result.har.log.entries[0].request.url);
  assert.equal(url, 'https://example.com/team/[REDACTED]/[REDACTED]/[REDACTED]');
});
test('removes known auth secrets copied into paths, headers are case insensitive', () => {
  const result = sanitizeHar(make({ url: 'https://example.com/callback/my-long-token', headers: [{ name: 'aUtHoRiZaTiOn', value: 'Bearer my-long-token' }] }));
  assert.ok(!JSON.stringify(result).includes('my-long-token'));
});
test('masks email, UUID, phone-like IDs and long tokens in paths', () => {
  const result = sanitizeHar(make({ url: 'https://example.com/user/alice%40example.org/550e8400-e29b-41d4-a716-446655440000/13912345678/abcdefghijklmnopqrstuvwxyz1234567890' }));
  assert.equal(result.stats.maskedPathSegments, 4);
  assert.ok(!JSON.stringify(result).includes('alice'));
});
test('ordinary domain and arbitrary path words remain, with explicit limitation', () => {
  const result = sanitizeHar(make({ url: 'https://internal.example.com/customer/Alice' }));
  assert.equal(result.har.log.entries[0].request.url, 'https://internal.example.com/customer/Alice');
  assert.ok(result.warnings.some(warning => warning.includes('任意路径')));
});
test('known custom secret in host is replaced without creating invalid host', () => {
  const result = sanitizeHar(make({ url: 'https://customername.example.com/orders' }), { secrets: 'customername' });
  assert.equal(new URL(result.har.log.entries[0].request.url).hostname, 'redacted.invalid');
  assert.equal(result.stats.maskedHosts, 1);
});
test('invalid URLs and non-http schemes never echo original contents', () => {
  for (const url of ['not-valid-private-data', 'data:text/html,private', 'javascript:alert(1)', 'file:///C:/private/key']) {
    const result = sanitizeHar(make({ url }));
    assert.equal(result.stats.invalidUrls, 1);
    assert.equal(result.har.log.entries[0].request.url, 'https://redacted.invalid/');
    assert.ok(!JSON.stringify(result.har).includes('private'));
  }
});
test('guards arbitrary typed metadata and normalizes invalid numbers and dates', () => {
  const result = sanitizeHar(make({ method: '<script>private</script>', headers: [{ name: 'Content-Type', value: 'not a mime' }] },
    { status: '503', content: { size: Infinity, mimeType: '<private>' } }, { startedDateTime: 'private', time: -20, timings: { wait: NaN, receive: 30, custom: 'private' } }));
  const entry = result.har.log.entries[0];
  assert.equal(entry.time, 0); assert.equal(entry.response.status, 0);
  assert.equal(entry.request.method, 'OTHER');
  assert.equal(entry.startedDateTime, '1970-01-01T00:00:00.000Z');
  assert.equal(entry.response.content.mimeType, 'application/octet-stream');
  assert.deepEqual(entry.timings, { send: -1, wait: -1, receive: 30 });
  assert.ok(!JSON.stringify(result.har).includes('private'));
});
test('unrecognized prototype-like keys are never copied', () => {
  const input = JSON.parse('{"log":{"entries":[{"request":{"url":"https://example.com","__proto__":{"polluted":true}},"response":{"status":200},"constructor":"private"}]}}');
  const result = sanitizeHar(input);
  assert.equal({}.polluted, undefined);
  assert.ok(!JSON.stringify(result.har).includes('polluted'));
});
test('counts status 0, HTTP failures, threshold equality and percentile correctly', () => {
  const safe = sanitizeHar(DEMO_HAR);
  const result = analyzeHar(safe.har, 2000);
  assert.equal(result.total, 6); assert.equal(result.failed, 3); assert.equal(result.slow, 2);
  assert.equal(result.p95, 3800); assert.equal(result.issues.length, 4);
  assert.deepEqual(result.statusGroups, { '2xx': 3, '5xx': 1, '4xx': 1, '无响应': 1 });
  assert.equal(analyzeHar(safe.har, 2400).slow, 2);
  assert.throws(() => analyzeHar(safe.har, 0), /阈值/);
  assert.throws(() => analyzeHar(safe.har, Infinity), /阈值/);
});
test('handles empty HAR without inventing a failure', () => {
  const safe = sanitizeHar({ log: { entries: [] } });
  const analysis = analyzeHar(safe.har);
  assert.equal(analysis.p95, 0); assert.equal(analysis.failed, 0);
  assert.match(createReport(safe, analysis), /未发现符合阈值/);
});
test('report and AI material use sanitized values only and separate evidence from hypotheses', () => {
  const safe = sanitizeHar(DEMO_HAR);
  const analysis = analyzeHar(safe.har);
  const report = createReport(safe, analysis);
  const ai = createAiBrief(report);
  for (const forbidden of ['demo-only-token', 'demo-session-123', 'buyer@example.com', 'Synthetic buyer']) assert.ok(!ai.includes(forbidden));
  assert.match(report, /不代表已确认根因/);
  assert.match(ai, /待验证假设/);
  assert.match(ai, /不可信/);
});
test('Markdown escapes table and HTML control characters', () => {
  const safe = sanitizeHar(make({ url: 'https://example.com/test' }, { status: 500 }));
  const analysis = analyzeHar(safe.har);
  analysis.issues[0].url = '<img src=x onerror=alert(1)>|`\n';
  const report = createReport(safe, analysis);
  assert.ok(!report.includes('<img')); assert.ok(report.includes('&lt;img')); assert.ok(report.includes('&#124;')); assert.ok(report.includes('&#96;'));
});
test('bounds report length without removing the full sanitized HAR', () => {
  const input = make(); input.log.entries = Array.from({ length: 201 }, () => clone(input.log.entries[0]));
  const safe = sanitizeHar(input); const analysis = analyzeHar(safe.har);
  assert.equal(analysis.issues.length, 201);
  assert.equal(safe.har.log.entries.length, 201);
  assert.match(createReport(safe, analysis), /仅列出前 200/);
});
test('limits replacement-word input and normalizes duplicates', () => {
  assert.deepEqual(normalizeSecrets(' foo\nfoo\n\nlongword '), ['longword', 'foo']);
  assert.throws(() => normalizeSecrets(new Array(101).fill(0).map((_, i) => `secret${i}`)), /100 个/);
  assert.throws(() => normalizeSecrets('x'.repeat(1001)), /1,000/);
});
