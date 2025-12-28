import { useParams, Link } from "react-router-dom";
import tools from "../data/tools.json";
import ToolGrid from "../components/ToolGrid";

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
