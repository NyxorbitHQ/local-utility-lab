import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { DEMO_HAR } from '../src/demo.mjs';
import { buildDemo } from './build-demo.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = async name => (await readFile(path.join(root, name), 'utf8')).replace(/\r\n/g, '\n');
const [template, css, core, demo, app] = await Promise.all([
  read('src/index.html'), read('src/style.css'), read('src/core.mjs'), read('src/demo.mjs'), read('src/app.mjs')
]);
// This project deliberately uses a tiny, closed set of local modules. No general
// transpilation or third-party bundling is needed; keep imports on one line.
const script = [core, demo, app].map(source => source.replace(/^import .*;\r?\n/gm, '').replace(/^export /gm, '')).join('\n').replace(/<\/script/gi, '<\\/script');
const style = css.replace(/<\/style/gi, '<\\/style');
const hash = value => createHash('sha256').update(value, 'utf8').digest('base64');
const csp = `default-src 'none'; script-src 'sha256-${hash(script)}'; style-src 'sha256-${hash(style)}'; connect-src 'none'; img-src data:; base-uri 'none'; form-action 'none'; object-src 'none'`;
const html = template.replace('<!-- CSP -->', `<meta http-equiv="Content-Security-Policy" content="${csp}">`)
  .replace('<!-- STYLE -->', () => `<style>${style}</style>`).replace('<!-- SCRIPT -->', () => `<script type="module">${script}</script>`);
await mkdir(path.join(root, 'dist'), { recursive: true });
await mkdir(path.join(root, 'examples'), { recursive: true });
await writeFile(path.join(root, 'dist/index.html'), html, 'utf8');
// The downloadable copy works alone; its demo link intentionally opens the public site.
await writeFile(path.join(root, 'dist/har-workbench.html'), html.replace('href="./demo/"', 'href="https://nyxorbithq.github.io/local-utility-lab/demo/"'), 'utf8');
await writeFile(path.join(root, 'dist/.nojekyll'), '', 'utf8');
await writeFile(path.join(root, 'examples/synthetic-demo.har'), `${JSON.stringify(DEMO_HAR, null, 2)}\n`, 'utf8');
await buildDemo(root);
console.log(`Built dist/index.html (${Buffer.byteLength(html).toLocaleString()} bytes). No external dependencies or network requests.`);
