import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import tools from "../data/tools.json";
import ToolCard from "../components/ToolCard";

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

  /* ✅ SEO (15.1) — TITLE + META */
  useEffect(() => {
    const prevTitle = document.title;
    const prevDescription = document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content");

    document.title = `${tool.name} – AI Tool Review & Best Alternatives`;

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    metaDescription.content = `${tool.name} is an AI tool for ${tool.category}. ${tool.description}`;

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = `https://aitoolsfordev.com/tools/${tool.slug}`;

    return () => {
      document.title = prevTitle;
      if (prevDescription && metaDescription) {
        metaDescription.content = prevDescription;
      }
    };
  }, [tool]);

  /* ✅ SEO (15.3D) — STRUCTURED DATA */
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.name,
      applicationCategory: tool.category,
      operatingSystem: "Web",
      description: tool.description,
      url: tool.url
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [tool]);

  return (
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
                decoding="async"
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
               <p className="mt-4 text-slate-600 dark:text-slate-400">
  Looking for an honest review of {tool.name}?  
  Here’s everything you need to know — features, use cases,
  pricing insights, and the best alternatives.
</p>
            </p>
           


            <span className="inline-block text-sm bg-slate-100 dark:bg-slate-700
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

        {/* ✅ NEW: USE CASES */}
        <h3 className="text-lg font-semibold mb-2 dark:text-white">
          Best Use Cases
        </h3>

        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mb-6">
          <li>Developers building faster with AI</li>
          <li>Startups improving productivity</li>
          <li>Creators automating workflows</li>
        </ul>

        {/* ✅ NEW: FAQ */}
        <h3 className="text-lg font-semibold mb-2 dark:text-white">
          Frequently Asked Questions
        </h3>

        <p className="text-slate-600 dark:text-slate-400 mb-2">
          <strong>Is {tool.name} free?</strong><br />
          Most AI tools offer free trials or limited free plans.
        </p>

        <p className="text-slate-600 dark:text-slate-400 mb-6">
          <strong>What are the best alternatives to {tool.name}?</strong><br />
          Explore similar tools in the same category below.
        </p>

        {/* ✅ NEW: INTERNAL LINK */}
        <Link
          to={`/category/${encodeURIComponent(tool.category)}`}
          className="text-indigo-600 dark:text-indigo-400 underline"
        >
          Explore more {tool.category} AI tools →
        </Link>

        
        {/* 🔍 Quick Info */}
<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
    <p className="text-xs text-slate-500">Category</p>
    <p className="font-semibold dark:text-white">{tool.category}</p>
  </div>

  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
    <p className="text-xs text-slate-500">Platform</p>
    <p className="font-semibold dark:text-white">Web</p>
  </div>

  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
    <p className="text-xs text-slate-500">Pricing</p>
    <p className="font-semibold dark:text-white">
      {tool.canAffiliate ? "Free / Paid" : "Free"}
    </p>
  </div>
</div>


        {/* CTA */}
        <div className="flex flex-wrap gap-4 mt-6">
          <a
  href={`/#/go/${tool.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2
             bg-gradient-to-r from-indigo-600 to-purple-600
             hover:from-indigo-700 hover:to-purple-700
             text-white px-8 py-4 rounded-xl
             font-semibold text-lg shadow-lg
             transition-transform hover:-translate-y-0.5"
>
  🚀 Visit {tool.name}
</a>


          <span className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400">
            ⭐ Trusted by developers worldwide
          </span>
          
        </div>
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
  Affiliate disclosure: Some outbound links may be affiliate links.
</p>

        <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
  ✔ Used by developers & creators worldwide  
  ✔ Curated by AI Tools Hub  
  ✔ Updated regularly
</div>

      </div>
      

      {/* 🔁 Related Tools */}
      {relatedTools.length > 0 && (
        <section className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            🔗 Related AI Tools in {tool.category}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map(rt => (
              <a
                key={rt.id}
                href={`/#/tools/${rt.slug}`}
                className="block rounded-xl"
              >
                <ToolCard tool={rt} />
              </a>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
