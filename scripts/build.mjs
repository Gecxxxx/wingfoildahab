import { cpSync, mkdirSync, rmSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
for (const entry of [
  "index.html",
  "assets",
  "components",
  "en",
  "ru",
  "equipment",
  "equipment-ru",
  "organizers",
  "organizers-ru",
  "why-bb-talkin",
  "why-bb-talkin-en",
  "history-of-wingfoil",
  "history-of-wingfoil-en",
  "wingfoil-racing-freestyle",
  "wingfoil-racing-freestyle-en",
  "wingfoil-for-beginners",
  "wingfoil-for-beginners-en",
  "kite-wingfoil-or-windsurf",
  "kite-wingfoil-or-windsurf-en",
  "why-dahab",
  "why-dahab-en",
  "wingfoil-training-dahab",
  "blog",
  "robots.txt",
  "sitemap.xml",
  "_redirects",
  "_headers",
]) {
  cpSync(entry, `dist/${entry}`, { recursive: true });
}
console.log("Static build created in dist/");
