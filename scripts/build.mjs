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
]) {
  cpSync(entry, `dist/${entry}`, { recursive: true });
}
console.log("Static build created in dist/");
