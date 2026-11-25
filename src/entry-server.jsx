// Point d'entrée du prérendu (build SSR) : rend une route en HTML statique.
// Utilisé par scripts/prerender.mjs après `vite build`.
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App.jsx";
import { projects, SITE_URL } from "./data/projects.js";

// Routes à prérendre, avec leurs métadonnées pour le <head>
export const routes = [
  { url: "/", file: "index.html" },
  ...projects.map((project) => ({
    url: `/projects/${project.slug}`,
    file: `projects/${project.slug}.html`,
    title: project.pageTitle,
    description: project.description,
  })),
].map((route) => ({ ...route, canonical: `${SITE_URL}${route.url}` }));

export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  );

  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}
