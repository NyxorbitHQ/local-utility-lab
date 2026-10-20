import { parseHar, sanitizeHar, analyzeHar, createReport, createAiBrief, MAX_BYTES } from './core.mjs';
import { DEMO_HAR } from './demo.mjs';

const $ = id => document.getElementById(id);
let rawText = '';
let current = null;
let importVersion = 0;
let busy = false;

function message(text, error = false) {
  $('status-message').textContent = text;
  $('status-message').classList.toggle('error', error);
}
function invalidate(note = '') {
  current = null;
  $('results').hidden = true;
  $('empty-state').hidden = false;
  $('har-preview').value = '';
  $('ai-preview').value = '';
  $('request-rows').replaceChildren();
  if (note) message(note);
  $('analyze-button').disabled = !rawText.trim() || busy;
}
function setSource(text, name) {
  rawText = text;
  $('source-info').hidden = !text;
  $('source-name').textContent = name;
  invalidate(text ? '已读取文件。确认规则后，生成脱敏报告。' : '先导入一个 HAR，或使用虚构示例体验。');
}
async function readFile(file) {
  const version = ++importVersion;
  $('paste-input').value = '';
  setSource('', '');
  if (!file) return;
  if (file.size > MAX_BYTES) { message('文件超过 20 MiB，请先筛选请求后重新导出。', true); return; }
  message('正在本地读取文件…');
  try {
    const text = await file.text();
    if (version === importVersion) setSource(text, file.name);
  } catch { if (version === importVersion) message('无法读取这个文件，请重新选择。', true); }
}
function tab(name, focus = false) {
  document.querySelectorAll('[data-tab]').forEach(button => {
    const active = button.dataset.tab === name;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
    $(`panel-${button.dataset.tab}`).hidden = !active;
    if (active && focus) button.focus();
  });
}
function renderRows() {
  if (!current) return;
  const all = $('issues-only').checked ? current.analysis.issues : current.analysis.requests;
  const fragment = document.createDocumentFragment();
  for (const item of all.slice(0, 200)) {
    const row = document.createElement('tr');
    const index = document.createElement('td'); index.textContent = item.index;
    const address = document.createElement('td');
    const method = document.createElement('span'); method.className = 'request-method'; method.textContent = item.method;
    const url = document.createElement('span'); url.className = 'request-url'; url.textContent = item.url;
    address.append(method, url);
    const status = document.createElement('td');
    const code = document.createElement('span'); code.className = `status-code${item.failed ? ' failed' : ''}`; code.textContent = item.status || '无响应'; status.append(code);
    const duration = document.createElement('td'); duration.textContent = `${Math.round(item.time).toLocaleString()} ms`;
    const tags = document.createElement('td');
    for (const [condition, text, failed] of [[item.failed, item.status ? 'HTTP 异常' : '未收到响应', true], [item.slow, '超过阈值', false]]) {
      if (condition) { const tag = document.createElement('span'); tag.className = `issue-tag${failed ? ' failed' : ''}`; tag.textContent = text; tags.append(tag); }
    }
    if (!tags.childElementCount) tags.textContent = '—';
    row.append(index, address, status, duration, tags); fragment.append(row);
  }
  if (!all.length) {
    const row = document.createElement('tr'); const empty = document.createElement('td');
    empty.colSpan = 5; empty.textContent = '未发现符合条件的请求。可以取消筛选查看全部请求。'; row.append(empty); fragment.append(row);
  }
  $('request-rows').replaceChildren(fragment);
  $('table-note').textContent = `显示 ${Math.min(all.length, 200)} / ${all.length} 条${all.length > 200 ? '。页面与 Markdown 最多列出 200 条，完整请求见脱敏 HAR' : ''}。这里只整理现象，不自动判断根因。`;
}
async function analyze() {
  if (busy || !rawText.trim()) return;
  invalidate(); busy = true;
  $('analyze-button').disabled = true;
  message('正在本地脱敏并整理线索…');
  // Give the UI a paint before bounded synchronous processing.
  await new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 0)));
  try {
    const parsed = parseHar(rawText);
    const sanitized = sanitizeHar(parsed, { secrets: $('custom-secrets').value });
    const analysis = analyzeHar(sanitized.har, Number($('slow-threshold').value));
    const report = createReport(sanitized, analysis);
    current = { sanitized, analysis, report, ai: createAiBrief(report), json: JSON.stringify(sanitized.har, null, 2) };
    $('metric-total').textContent = analysis.total.toLocaleString();
    $('metric-failed').textContent = analysis.failed.toLocaleString();
    $('metric-slow').textContent = analysis.slow.toLocaleString();
    $('metric-threshold').textContent = `≥ ${analysis.slowThreshold.toLocaleString()} ms`;
    $('metric-p95').replaceChildren(document.createTextNode(`${Math.round(analysis.p95).toLocaleString()} `));
    const unit = document.createElement('em'); unit.textContent = 'ms'; $('metric-p95').append(unit);
    $('redaction-summary').textContent = `移除 ${sanitized.stats.removedHeaders} 个头 · 隐藏 ${sanitized.stats.maskedQueryValues} 个参数值`;
    const groups = document.createDocumentFragment();
    for (const [name, count] of Object.entries(analysis.statusGroups)) { const badge = document.createElement('span'); badge.textContent = `${name} · ${count}`; groups.append(badge); }
    $('status-distribution').replaceChildren(groups);
    $('har-preview').value = current.json;
    $('ai-preview').value = current.ai;
    $('results').hidden = false; $('empty-state').hidden = true;
    tab('requests'); renderRows();
    message(`处理完成：${analysis.total} 条请求。请先检查脱敏预览，再下载或复制。${sanitized.stats.invalidUrls ? ` ${sanitized.stats.invalidUrls} 个无效地址已替换。` : ''}`);
  } catch (error) {
    invalidate(); message(error instanceof Error ? error.message : '处理失败，请检查 HAR 格式。', true);
  } finally { busy = false; $('analyze-button').disabled = !rawText.trim(); }
}

function download(content, filename, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename;
  document.body.append(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  message(`已生成 ${filename}。分享前请检查域名、路径与业务信息。`);
}

$('file-input').addEventListener('change', event => readFile(event.target.files[0]));
$('dropzone').addEventListener('dragover', event => { event.preventDefault(); $('dropzone').classList.add('dragover'); });
$('dropzone').addEventListener('dragleave', () => $('dropzone').classList.remove('dragover'));
$('dropzone').addEventListener('drop', event => {
  event.preventDefault(); $('dropzone').classList.remove('dragover');
  if (event.dataTransfer.files.length !== 1) { ++importVersion; setSource('', ''); message('一次请选择一个 HAR 文件。', true); return; }
  readFile(event.dataTransfer.files[0]);
});
$('paste-input').addEventListener('input', event => { ++importVersion; $('file-input').value = ''; setSource(event.target.value, '粘贴的 HAR JSON'); });
$('clear-button').addEventListener('click', () => { ++importVersion; $('paste-input').value = ''; $('file-input').value = ''; setSource('', ''); });
$('demo-button').addEventListener('click', () => { ++importVersion; $('paste-input').value = ''; $('file-input').value = ''; setSource(JSON.stringify(DEMO_HAR), 'synthetic-demo.har · 完全虚构'); analyze(); });
$('custom-secrets').addEventListener('input', () => invalidate('替换规则已变化，请重新生成报告。'));
$('slow-threshold').addEventListener('change', () => invalidate('慢请求阈值已变化，请重新生成报告。'));
$('analyze-button').addEventListener('click', analyze);
$('issues-only').addEventListener('change', renderRows);
document.querySelectorAll('[data-tab]').forEach((button, index, buttons) => {
  button.addEventListener('click', () => tab(button.dataset.tab));
  button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = buttons.length - 1;
    if (next !== undefined) { event.preventDefault(); tab(buttons[next].dataset.tab, true); }
  });
});
$('download-har').addEventListener('click', () => { if (current) download(current.json, 'sanitized.har', 'application/json;charset=utf-8'); });
$('download-report').addEventListener('click', () => { if (current) download(current.report, 'har-evidence.md', 'text/markdown;charset=utf-8'); });
$('download-ai').addEventListener('click', () => { if (current) download(current.ai, 'har-ai-brief.txt', 'text/plain;charset=utf-8'); });
$('copy-ai').addEventListener('click', async () => {
  if (!current) return;
  const text = current.ai;
  try { await navigator.clipboard.writeText(text); message('已复制分析材料。此页面未调用任何模型。'); }
  catch { $('ai-preview').focus(); $('ai-preview').select(); message('浏览器不允许直接复制。已选中内容，请按 Ctrl+C 或 Command+C。'); }
});
function view(name) {
  if (!['workspace', 'guide', 'research'].includes(name)) name = 'workspace';
  document.querySelectorAll('[data-page]').forEach(page => { page.hidden = page.dataset.page !== name; });
  document.querySelectorAll('[data-view]').forEach(button => {
    const active = button.dataset.view === name; button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    if (active) $('breadcrumb').textContent = button.textContent.replace(/01|⌘|▤|↗/g, '').trim();
  });
}
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => { location.hash = button.dataset.view; view(button.dataset.view); }));
window.addEventListener('hashchange', () => view(location.hash.slice(1)));
view(location.hash.slice(1));
