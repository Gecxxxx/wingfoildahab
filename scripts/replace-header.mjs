import { readFileSync, writeFileSync } from 'node:fs';

const file = 'ru/index.html';
const html = readFileSync(file, 'utf8');
const start = html.indexOf('<div id="rec2088597551"');
const end = html.indexOf('<div id="rec2088597581"');

if (start < 0 || end < 0 || end <= start) {
  throw new Error('Header record boundaries were not found');
}

const component = `<link rel="stylesheet" href="../components/clean-preview.css"><script src="../components/clean-preview.js"></script><div id="rec2088597551" class="clean-header-block"><div id="vf-header-root"></div><link rel="stylesheet" href="../components/header.css"><script src="../components/header.js" defer></script></div> `;
writeFileSync(file, html.slice(0, start) + component + html.slice(end));
