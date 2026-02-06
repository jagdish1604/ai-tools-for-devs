const fs = require("fs");
const path = require("path");

const tools = require("../src/data/tools.json");

const DOMAIN = "https://aitoolsfordev.com";

/* -----------------------------
   Static pages
------------------------------ */
const staticPages = [""];

/* -----------------------------
   Tool detail pages
------------------------------ */
const toolPages = tools.map(tool => `/tools/${tool.slug}`);

/* -----------------------------
   Category pages
------------------------------ */
const categories = [...new Set(tools.map(tool => tool.category))];
const categoryPages = categories.map(
  category => `/category/${encodeURIComponent(category)}`
);

/* -----------------------------
   🔀 Compare pages (NEW – SAFE)
   Logic:
   - group by category
   - take top 3 tools per category
   - generate 1–2 comparisons max
------------------------------ */
const comparePages = [];

const categoryMap = {};
tools.forEach(tool => {
  if (!categoryMap[tool.category]) {
    categoryMap[tool.category] = [];
  }
  categoryMap[tool.category].push(tool);
});

Object.values(categoryMap).forEach(categoryTools => {
  const topTools = categoryTools.slice(0, 3); // LIMIT

  for (let i = 0; i < topTools.length - 1; i++) {
    const a = topTools[i];
    const b = topTools[i + 1];

    comparePages.push(`/compare/${a.slug}-vs-${b.slug}`);
  }
});

/* -----------------------------
   Combine all URLs
------------------------------ */
const urls = [
  ...staticPages,
  ...toolPages,
  ...categoryPages,
  ...comparePages
];

/* -----------------------------
   Generate sitemap XML
------------------------------ */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `
  <url>
    <loc>${DOMAIN}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${
      url === "" ? "1.0" : url.startsWith("/compare") ? "0.7" : "0.8"
    }</priority>
  </url>`
  )
  .join("")}
</urlset>`;

fs.writeFileSync(
  path.join(__dirname, "../public/sitemap.xml"),
  sitemap.trim()
);

console.log("✅ sitemap.xml generated successfully");
