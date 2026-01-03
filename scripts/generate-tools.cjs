const fs = require("fs");
const path = require("path");

const csvPath = path.join(__dirname, "tools.csv");
const outputPath = path.join(__dirname, "../src/data/tools.json");

const csv = fs.readFileSync(csvPath, "utf8");
const lines = csv.split("\n").filter(Boolean);

const headers = lines[0].split(",").map(h => h.trim());

const tools = lines.slice(1).map(line => {
  const values = line.split(",").map(v => v.trim());

  const tool = {};
  headers.forEach((h, i) => {
    let val = values[i];

    if (val === "TRUE") val = true;
    if (val === "FALSE") val = false;

    tool[h] = val || "";
  });

  return tool;
});

fs.writeFileSync(outputPath, JSON.stringify(tools, null, 2));

console.log(`✅ Generated ${tools.length} tools into tools.json`);
