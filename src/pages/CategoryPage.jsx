import { useParams, Link } from "react-router-dom";
import tools from "../data/tools.json";
import ToolGrid from "../components/ToolGrid";
import { Helmet } from "react-helmet-async";


export default function CategoryPage() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const categoryTools = tools.filter(
    tool => tool.category === decodedCategory
  );

  if (categoryTools.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold">
          Category not found
        </h1>
      </div>
    );
  }

  return (
     <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-12">
      <Helmet>
  {/* 1. Dynamic Title: User ki problem solve karne wala title */}
  <title>Top {decodedCategory} AI Tools (Free & Paid) - Feb 2026 | AI Tools Hub</title>
  
  {/* 2. Conversion-Focused Description */}
  <meta
    name="description"
    content={`Discover the highest-rated ${decodedCategory} AI tools for developers. Compare the best ${decodedCategory} solutions for your workflow. Updated weekly with the latest 2026 releases.`}
  />
  
  {/* 3. Long-tail Keywords for better ranking */}
  <meta
    name="keywords"
    content={`${decodedCategory} AI tools, best ${decodedCategory} software, free ${decodedCategory} AI, AI tools for developers 2026, ${decodedCategory} alternatives, coding AI hub`}
  />

  <link
    rel="canonical"
    href={`https://aitoolsfordev.com/category/${encodeURIComponent(category)}`}
  />

  {/* 4. Open Graph - Social Media visibility */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content={`Must-Have ${decodedCategory} AI Tools for Developers`} />
  <meta
    property="og:description"
    content={`Stop searching. We've curated the best ${decodedCategory} AI tools in one place. Perfect for developers, startups, and tech founders.`}
  />
  <meta property="og:url" content={`https://aitoolsfordev.com/category/${category}`} />
  <meta property="og:image" content="https://aitoolsfordev.com/category-share-image.png" />

  {/* 5. 🚀 CollectionPage Schema - Google ko batane ke liye ki ye ek list hai */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `Best ${decodedCategory} AI Tools Collection`,
      "description": `A curated directory of the top ${decodedCategory} AI tools and software for software engineers and creators.`,
      "url": `https://aitoolsfordev.com/category/${category}`,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aitoolsfordev.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": decodedCategory,
            "item": `https://aitoolsfordev.com/category/${category}`
          }
        ]
      }
    })}
  </script>
</Helmet>
    <div className="max-w-7xl mx-auto">
      <Link
        to="/"
       className="text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        ← Back to tools
      </Link>

      <h1 className="text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
  Best {decodedCategory} Tools
</h1>


      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl">

        Explore the best {decodedCategory} AI tools curated for developers,
        startups, and creators. Updated regularly.
      </p>
<p className="sr-only">
  Discover top {decodedCategory} AI tools, software, and platforms.
  Compare features, pricing, and use cases to choose the best solution.
</p>

      <ToolGrid tools={categoryTools} />
    </div>
     </div>
  );
}
