import { readFileSync, writeFileSync } from 'node:fs';

const file = 'ru/index.html';
const html = readFileSync(file, 'utf8');
const start = html.indexOf('<div id="rec2088597581"');
const end = html.indexOf('<div id="rec2089228961"');

if (start < 0 || end < 0 || end <= start) {
  throw new Error('Hero record boundaries were not found');
}

const component = `<div id="rec2088597581" class="clean-hero-block"><div id="vf-hero-root"></div><link rel="stylesheet" href="../components/hero.css"><script src="../components/hero.js" defer></script></div> `;
writeFileSync(file, html.slice(0, start) + component + html.slice(end));
