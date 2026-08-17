import { readFileSync, writeFileSync } from 'node:fs';

const file = 'ru/index.html';
const html = readFileSync(file, 'utf8');
const marker = '<div id="rec2088597551" class="clean-header-block">';
const assets = '<link rel="stylesheet" href="../components/clean-preview.css"><script src="../components/clean-preview.js"></script>';

if (!html.includes(marker)) throw new Error('Clean header marker was not found');
if (!html.includes('../components/clean-preview.css')) {
  writeFileSync(file, html.replace(marker, assets + marker));
}
