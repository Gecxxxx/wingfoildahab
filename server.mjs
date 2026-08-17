import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const args = process.argv.slice(2);
const portArg = args.indexOf("--port");
const port = portArg >= 0 ? Number(args[portArg + 1]) : 4173;
const root = process.cwd();

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const safePath = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "");
  let filePath = join(root, safePath);

  try {
    if (statSync(filePath).isDirectory()) filePath = join(filePath, "index.html");
  } catch {
    if (!extname(filePath)) filePath = join(filePath, "index.html");
  }

  try {
    const stat = statSync(filePath);
    if (!stat.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "Content-Type": types[extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`WingFoilDahab preview running on port ${port}`);
});
