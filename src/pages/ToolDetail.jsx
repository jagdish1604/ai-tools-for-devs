import { useParams, Link } from "react-router-dom";
import tools from "../data/tools.json";
import ToolCard from "../components/ToolCard";

export default function ToolDetail() {
  const { slug } = useParams();
  const tool = tools.find(t => t.slug === slug);
const relatedTools = tools
  .filter(t => t.category === tool.category && t.slug !== tool.slug)
  .slice(0, 4);

  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold">Tool not found</h1>
      </div>
    );
  }

  return (
    /* 🌈 Page Background */
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-12">

      {/* 🔙 Back */}
      <div className="max-w-5xl mx-auto mb-6">
        <Link
          to="/"
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          ← Back to tools
        </Link>
      </div>

      {/* 🦸 Hero Section */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 mb-8">

        <div className="flex flex-col md:flex-row items-start gap-6">

          {/* 🖼️ Tool Logo */}
          <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
            {tool.logo ? (
              <img
                src={tool.logo}
                alt={`${tool.name} logo`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            ) : (
              <span className="text-3xl font-bold text-slate-400">
                {tool.name.charAt(0)}
              </span>
            )}
          </div>

          {/* 🧠 Title + Description */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-3 dark:text-white">
              {tool.name}
            </h1>

            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {tool.description}
            </p>

            <span className="inline-block text-sm bg-slate-100 dark:bg-slate-700
                             text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
              {tool.category}
            </span>
          </div>
        </div>
      </div>

      {/* 📦 Content Card */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow p-8">

        <h2 className="text-xl font-bold mb-4 dark:text-white">
          About {tool.name}
        </h2>

        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {tool.longDescription || tool.description}
        </p>

        {/* 🚀 CTA */}
       <div className="flex flex-wrap gap-4 mt-6">
  {/* Primary CTA */}
  <a
    href={tool.url}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => {
      window.gtag?.("event", "visit_tool", {
        tool_name: tool.name,
        category: tool.category,
      });
    }}
    className="inline-flex items-center justify-center
               bg-indigo-600 hover:bg-indigo-700
               text-white px-6 py-3 rounded-lg font-semibold
               transition"
  >
    🚀 Visit Official Website
  </a>

  {/* Secondary CTA */}
  <span className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400">
    ⭐ Trusted by developers worldwide
  </span>
</div>


      </div>

{/* 🔁 Related Tools */}
{relatedTools.length > 0 && (
  <div className="max-w-5xl mx-auto mt-12">
    <h2 className="text-2xl font-bold mb-6 dark:text-white">
      🔗 Related Tools
    </h2>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {relatedTools.map(tool => (
        <ToolCard
          key={tool.id}
          tool={tool}
          onClick={() => window.location.href = `/tool/${tool.slug}`}
        />
      ))}
    </div>
  </div>
)}


    </div>
  );
}
