import { useParams, Link } from "react-router-dom";
import tools from "../data/tools.json";
import ToolCard from "../components/ToolCard";
import { Helmet } from "react-helmet-async";
import { getBestFor, getUseCases } from "../utils/toolMetadata";
import { getAlternatives } from "../utils/toolMetadata";
import AlternativesSection from "../components/AlternativesSection";


export default function ToolDetail() {
  const { slug } = useParams();
  const tool = tools.find(t => t.slug === slug);


  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold">Tool not found</h1>
      </div>
    );
  }

  const relatedTools = tools
    .filter(t => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 4);
const alternatives = getAlternatives(tool, tools);

  const bestFor = getBestFor(tool);
  const useCases = getUseCases(tool);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-12">

      {/* ✅ SEO (SINGLE SOURCE OF TRUTH) */}
      <Helmet>
        <title>{tool.name} – AI Tool Review & Best Alternatives</title>
        <meta
          name="description"
          content={`${tool.name} is an AI tool for ${tool.category}. Learn features, use cases, pricing, and best alternatives.`}
        />
        <link
          rel="canonical"
          href={`https://aitoolsfordev.com/tools/${tool.slug}`}
        />
      </Helmet>

      {/* 🔙 Back */}
      <div className="max-w-5xl mx-auto mb-6">
        <Link
          to="/"
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          ← Back to tools
        </Link>
      </div>

      {/* 🦸 Hero */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">

          {/* Logo */}
          <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
            {tool.logo ? (
              <img
                src={tool.logo}
                alt={`${tool.name} logo`}
                width="80"
                height="80"
                loading="lazy"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-3xl font-bold text-slate-400">
                {tool.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Title */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-3 dark:text-white">
              {tool.name} – AI Tool Review, Features & Alternatives
            </h1>

            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {tool.description}
            </p>

            <p className="text-slate-600 dark:text-slate-400">
              Looking for an honest review of {tool.name}?  
              Here’s everything you need to know — features, use cases,
              pricing insights, and the best alternatives.
            </p>

            <span className="inline-block mt-4 text-sm bg-slate-100 dark:bg-slate-700
                             text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
              {tool.category}
            </span>
          </div>
        </div>
      </div>

      {/* 📦 Content */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow p-8">

        <h2 className="text-xl font-bold mb-4 dark:text-white">
          About {tool.name}
        </h2>

        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
          {tool.longDescription || tool.description}
        </p>

        {/* 🎯 BEST FOR */}
        {bestFor.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-3 dark:text-white">
              Best for
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {bestFor.map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full
                             bg-indigo-100 text-indigo-700
                             dark:bg-indigo-900 dark:text-indigo-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </>
        )}

        {/* 🧩 USE CASES */}
        {useCases.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-3 dark:text-white">
              What can you do with {tool.name}?
            </h3>

            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 mb-6">
              {useCases.map((uc, i) => (
                <li key={i}>{uc}</li>
              ))}
            </ul>
          </>
        )}

        {/* 🔗 Category link */}
        <Link
          to={`/category/${encodeURIComponent(tool.category)}`}
          className="text-indigo-600 dark:text-indigo-400 underline"
        >
          Explore more {tool.category} AI tools →
        </Link>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 mt-8">
          <a
            href={`/go/${tool.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       hover:from-indigo-700 hover:to-purple-700
                       text-white px-8 py-4 rounded-xl
                       font-semibold text-lg shadow-lg"
          >
            🚀 Visit {tool.name}
          </a>
        </div>

        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          Affiliate disclosure: Some outbound links may be affiliate links.
        </p>
      </div>

        <AlternativesSection
  currentTool={tool}
  alternatives={alternatives}
/>
{/* 🔀 Compare CTA */}
{alternatives.length > 0 && (
  <div className="max-w-5xl mx-auto mt-4">
    <Link
      to={`/compare/${tool.slug}-vs-${alternatives[0].slug}`}
      className="text-indigo-600 dark:text-indigo-400 underline font-medium"
    >
      Compare {tool.name} with {alternatives[0].name} →
    </Link>
  </div>
)}


{/* 🔁 Related Tools (you already have this) */}


      {/* 🔁 Related Tools */}
      {relatedTools.length > 0 && (
        <section className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            🔗 Related AI Tools in {tool.category}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map(rt => (
              <Link key={rt.slug} to={`/tools/${rt.slug}`}>
                <ToolCard tool={rt} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
