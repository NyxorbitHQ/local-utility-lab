import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, cp, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

test('build creates an offline standalone page with matching CSP hashes', async () => {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const temp = await mkdtemp(path.join(tmpdir(), 'local-utility-build-'));
  try {
    await cp(path.join(root, 'src'), path.join(temp, 'src'), { recursive: true });
    await cp(path.join(root, 'scripts'), path.join(temp, 'scripts'), { recursive: true });
    await cp(path.join(root, 'docs/assets'), path.join(temp, 'docs/assets'), { recursive: true });
    await cp(path.join(root, 'package.json'), path.join(temp, 'package.json'));
    const build = spawnSync(process.execPath, ['scripts/build.mjs'], { cwd: temp, encoding: 'utf8' });
    assert.equal(build.status, 0, build.stderr);
    const html = await readFile(path.join(temp, 'dist/index.html'), 'utf8');
    const script = html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
    const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
    const hash = value => createHash('sha256').update(value).digest('base64');
    assert.ok(html.includes(`script-src 'sha256-${hash(script)}'`));
    assert.ok(html.includes(`style-src 'sha256-${hash(css)}'`));
    assert.ok(html.includes("connect-src 'none'"));
    assert.ok(!/^import /m.test(script)); assert.ok(!/^export /m.test(script));
    assert.ok(!/<script[^>]+src=/i.test(html)); assert.ok(!/<link[^>]+href=/i.test(html));
    assert.ok(!/localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|sendBeacon|WebSocket/.test(script));
    assert.ok(!/\.innerHTML\s*=|insertAdjacentHTML/.test(script));
    const standalone = await readFile(path.join(temp, 'dist/har-workbench.html'), 'utf8');
    assert.ok(standalone.includes('href="https://nyxorbithq.github.io/local-utility-lab/demo/"'));
    const tour = await readFile(path.join(temp, 'dist/demo/index.html'), 'utf8');
    const tourScript = tour.match(/<script>([\s\S]*?)<\/script>/)[1];
    const tourStyle = tour.match(/<style>([\s\S]*?)<\/style>/)[1];
    assert.ok(tour.includes(`script-src 'sha256-${hash(tourScript)}'`));
    assert.ok(tour.includes(`style-src 'sha256-${hash(tourStyle)}'`));
    assert.ok(tour.includes("connect-src 'none'"));
    assert.ok(tour.includes('暂停')); assert.ok(tour.includes('Pause'));
    assert.ok(tour.includes('6000')); assert.ok(!tour.includes('autoplay'));
    for (let i = 1; i <= 5; i++) {
      assert.deepEqual(await readFile(path.join(temp, `dist/media/step-${i}.jpg`)), await readFile(path.join(root, `docs/assets/step-${i}.jpg`)));
    }
    const syntax = spawnSync(process.execPath, ['--input-type=module', '--check'], { input: script, encoding: 'utf8' });
    assert.equal(syntax.status, 0, syntax.stderr);
    const first = html;
    spawnSync(process.execPath, ['scripts/build.mjs'], { cwd: temp, encoding: 'utf8' });
    assert.equal(await readFile(path.join(temp, 'dist/index.html'), 'utf8'), first);
    // Git/editor CRLF conversion must not break browser CSP or reproducibility.
    for (const name of ['index.html', 'style.css', 'core.mjs', 'demo.mjs', 'app.mjs']) {
      const filename = path.join(temp, 'src', name);
      await writeFile(filename, (await readFile(filename, 'utf8')).replace(/\r?\n/g, '\r\n'));
    }
    const crlfBuild = spawnSync(process.execPath, ['scripts/build.mjs'], { cwd: temp, encoding: 'utf8' });
    assert.equal(crlfBuild.status, 0, crlfBuild.stderr);
    assert.equal(await readFile(path.join(temp, 'dist/index.html'), 'utf8'), first);
  } finally {
    if (!path.resolve(temp).startsWith(`${path.resolve(tmpdir())}${path.sep}local-utility-build-`)) throw new Error('Unexpected temporary path');
    await rm(temp, { recursive: true, force: true });
  }
});
