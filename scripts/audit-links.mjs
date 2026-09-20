import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const pages = [];
for (const entry of readdirSync('.', { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.html')) pages.push(entry.name);
  if (entry.isDirectory() && existsSync(path.join(entry.name, 'index.html'))) {
    pages.push(path.join(entry.name, 'index.html'));
  }
}

const broken = [];
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
    const relative = href.split(/[?#]/)[0];
    if (!relative) continue;
    const target = relative.startsWith('/')
      ? relative.slice(1)
      : path.normalize(path.join(path.dirname(page), relative));
    if (!existsSync(target) && !existsSync(path.join(target, 'index.html'))) {
      broken.push({ page, href });
    }
  }
}

console.log(`Checked ${pages.length} HTML pages.`);
if (broken.length) {
  console.error(JSON.stringify(broken, null, 2));
  process.exitCode = 1;
} else {
  console.log('No broken local page links found.');
}
