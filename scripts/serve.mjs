import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const args = process.argv.slice(2);
if (args.length && !(args.length === 2 && args[0] === '--port')) {
  console.error('Usage: npm start -- --port 4173'); process.exit(1);
}
const port = args.length ? Number(args[1]) : 4173;
if (!Number.isInteger(port) || port < 0 || port > 65535) { console.error('Invalid port'); process.exit(1); }
const filename = fileURLToPath(new URL('../dist/index.html', import.meta.url));
const directory = path.dirname(filename);
const routes = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/har-workbench.html', ['har-workbench.html', 'text/html; charset=utf-8']],
  ['/demo/', ['demo/index.html', 'text/html; charset=utf-8']],
  ['/demo/index.html', ['demo/index.html', 'text/html; charset=utf-8']],
  ...Array.from({ length: 5 }, (_, i) => [`/media/step-${i + 1}.jpg`, [`media/step-${i + 1}.jpg`, 'image/jpeg']])
]);
try { await readFile(filename); }
catch { console.error('Run npm run build first.'); process.exit(1); }
const server = http.createServer(async (request, response) => {
  const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'X-Frame-Options': 'DENY' };
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, { ...headers, Allow: 'GET, HEAD' }); response.end(); return; }
  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (pathname === '/favicon.ico') { response.writeHead(204, headers); response.end(); return; }
  if (pathname === '/demo') { response.writeHead(302, { ...headers, Location: '/demo/' }); response.end(); return; }
  const route = routes.get(pathname);
  if (!route) { response.writeHead(404, headers); response.end('Not found'); return; }
  try {
    const html = await readFile(path.join(directory, route[0]));
    response.writeHead(200, { ...headers, 'Content-Type': route[1], 'Content-Length': html.length });
    response.end(request.method === 'HEAD' ? undefined : html);
  } catch { response.writeHead(500, headers); response.end('Unable to read built page'); }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${server.address().port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
