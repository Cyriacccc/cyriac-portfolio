// Prérendu des pages au build : écrit dans dist/ un HTML déjà rempli pour
// chaque route, lisible par les moteurs de recherche et affiché avant le JS.
// Lancé par `npm run build` après le build client et le build SSR.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverEntry = pathToFileURL(path.join(root, "dist-server", "entry-server.js")).href;

const { render, routes } = await import(serverEntry);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const escape = (text) =>
  text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`Balise introuvable dans index.html : ${label}`);
  return html.replace(pattern, replacement);
}

for (const route of routes) {
  const appHtml = await render(route.url);
  let html = replaceOnce(template, /<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`, "#root");

  html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${route.canonical}" />`, "canonical");
  html = replaceOnce(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${route.canonical}" />`, "og:url");

  if (route.title) {
    const title = escape(route.title);
    const description = escape(route.description);
    html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, "title");
    html = replaceOnce(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${description}$2`, "description");
    html = replaceOnce(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`, "og:title");
    html = replaceOnce(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${description}$2`, "og:description");
  }

  if (route.noindex) {
    html = replaceOnce(html, /<\/head>/, `  <meta name="robots" content="noindex" />\n  </head>`, "</head>");
  }

  const out = path.join(dist, route.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(`prérendu : ${route.url} → dist/${route.file} (${(html.length / 1024).toFixed(1)} Ko)`);
}
