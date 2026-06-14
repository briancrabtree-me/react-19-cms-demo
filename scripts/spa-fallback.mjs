import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const indexPath = join(dist, 'index.html');
const indexHtml = readFileSync(indexPath, 'utf8');

writeFileSync(join(dist, '404.html'), indexHtml);

for (const route of ['admin', 'about', 'blog']) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  cpSync(indexPath, join(dir, 'index.html'));
}
