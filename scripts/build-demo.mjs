import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

export async function buildDemo(root) {
  const template = (await readFile(path.join(root, 'src/demo-page.html'), 'utf8')).replace(/\r\n/g, '\n');
  const hash = value => createHash('sha256').update(value).digest('base64');
  const style = template.match(/<style>([\s\S]*?)<\/style>/)[1];
  const script = template.match(/<script>([\s\S]*?)<\/script>/)[1];
  const policy = `default-src 'none'; img-src 'self'; style-src 'sha256-${hash(style)}'; script-src 'sha256-${hash(script)}'; connect-src 'none'; base-uri 'none'; form-action 'none'; object-src 'none'`;
  await mkdir(path.join(root, 'dist/demo'), { recursive: true });
  await mkdir(path.join(root, 'dist/media'), { recursive: true });
  await writeFile(path.join(root, 'dist/demo/index.html'), template.replace('<!-- CSP -->', `<meta http-equiv="Content-Security-Policy" content="${policy}">`), 'utf8');
  for (let i = 1; i <= 5; i++) {
    await copyFile(path.join(root, `docs/assets/step-${i}.jpg`), path.join(root, `dist/media/step-${i}.jpg`));
  }
}
