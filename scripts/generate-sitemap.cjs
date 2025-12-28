const fs = require("fs");
const path = require("path");

const tools = require("../src/data/tools.json");

const DOMAIN = "https://aitoolsfordev.com";

/* Static pages */
const staticPages = [""];

/* Tool detail pages */
const toolPages = tools.map(tool => `/tools/${tool.slug}`);

/* Category pages */
const categories = [...new Set(tools.map(tool => tool.category))];
const categoryPages = categories.map(
  category => `/category/${encodeURIComponent(category)}`
);

/* Combine all URLs */
const urls = [...staticPages, ...toolPages, ...categoryPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `
  <url>
    <loc>${DOMAIN}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === "" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

fs.writeFileSync(
  path.join(__dirname, "../public/sitemap.xml"),
  sitemap.trim()
);

console.log("✅ sitemap.xml generated successfully");
