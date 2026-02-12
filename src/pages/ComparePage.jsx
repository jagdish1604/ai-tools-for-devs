import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import tools from "../data/tools.json";

export default function ComparePage() {
  const { slugs } = useParams();

  const toolSlugs = slugs.split("-vs-");
  const selectedTools = tools.filter(t =>
    toolSlugs.includes(t.slug)
  );

  if (selectedTools.length < 2) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-bold">Comparison not available</h1>
      </div>
    );
  }

  const title = selectedTools.map(t => t.name).join(" vs ");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-6 py-12">

      {/* ✅ SEO */}
      <Helmet>
  {/* 1. VS Optimized Title: Jab log search karein "Tool A vs Tool B" */}
  <title>{selectedTools.map(t => t.name).join(' vs ')} | Which is Better? Comparison 2026</title>
  
  {/* 2. Benefit-Driven Description: Pricing aur Features ka zikr karein */}
  <meta
    name="description"
    content={`Detailed comparison: ${title}. Side-by-side analysis of features, pricing, and performance to help you choose the best AI tool for your development workflow.`}
  />
  
  {/* 3. High-Ranking Keywords */}
  <meta
    name="keywords"
    content={`${selectedTools.map(t => t.name + " vs").join(' ')} comparison, best AI tools comparison, pricing vs features, tool alternatives 2026`}
  />

  <link rel="canonical" href={`https://aitoolsfordev.com/compare/${slugs}`} />

  {/* 4. Open Graph for Social Comparison */}
  <meta property="og:type" content="article" />
  <meta property="og:title" content={`${title}: Side-by-Side Comparison`} />
  <meta property="og:description" content="Check out our deep dive comparison. We analyze pricing, pros, and cons of these top AI tools." />

  {/* 5. 🚀 UPGRADED SCHEMA: Product Comparison (Google understands 'vs' better this way) */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `${title} Comparison`,
      "description": `Side-by-side comparison of ${selectedTools.map(t => t.name).join(', ')}.`,
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": selectedTools.length,
        "itemListElement": selectedTools.map((tool, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "SoftwareApplication",
            "name": tool.name,
            "applicationCategory": tool.category,
            "operatingSystem": "Web",
            "url": `https://aitoolsfordev.com/tools/${tool.slug}`,
            "offers": {
              "@type": "Offer",
              "price": "0", // Default to free or dynamic price if available
              "priceCurrency": "USD"
            }
          }
        }))
      }
    })}
  </script>
</Helmet>

      <div className="max-w-6xl mx-auto">

        {/* 🔙 Back */}
        <Link
          to="/"
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          ← Back to tools
        </Link>

        {/* 🧠 Heading */}
        <h1 className="text-4xl font-extrabold mt-6 mb-4 dark:text-white">
          {title}
        </h1>

        <p className="text-slate-600 dark:text-slate-400 mb-8">
          A side-by-side comparison to help developers and creators
          choose the right AI tool.
        </p>

        {/* 📊 Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-4 text-left">Feature</th>
                {selectedTools.map(tool => (
                  <th key={tool.slug} className="p-4 text-left">
                    {tool.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-slate-800">
              <Row label="Category" tools={selectedTools} field="category" />
              <Row label="Best for" tools={selectedTools} custom />
              <Row label="Pricing" tools={selectedTools} pricing />
              <Row label="Website" tools={selectedTools} link />
            </tbody>
          </table>
        </div>

        {/* 🏆 Recommendation */}
        <div className="mt-10 bg-indigo-50 dark:bg-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-2 dark:text-white">
            Final Recommendation
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            {selectedTools[0].name} is ideal if you want simplicity and fast results.  
            {selectedTools[1].name} is better if you need flexibility and advanced control.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, tools, field, custom, pricing, link }) {
  return (
    <tr className="border-b border-slate-200 dark:border-slate-700">
      <td className="p-4 font-medium">{label}</td>

      {tools.map(tool => (
        <td key={tool.slug} className="p-4 text-slate-600 dark:text-slate-300">
          {custom && tool.category}
          {field && tool[field]}
          {pricing && (tool.canAffiliate ? "Free / Paid" : "Free")}
          {link && (
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline"
            >
              Visit
            </a>
          )}
        </td>
      ))}
    </tr>
  );
}
