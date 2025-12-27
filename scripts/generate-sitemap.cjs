const fs = require("fs");
const path = require("path");

const tools = require("../src/data/tools.json");

const DOMAIN = "https://aitoolsfordev.com";

const staticPages = [""];
const toolPages = tools.map(tool => `/tools/${tool.slug}`);
const urls = [...staticPages, ...toolPages];

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
  sitemap
);

console.log("✅ sitemap.xml generated successfully");
