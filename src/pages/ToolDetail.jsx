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

  /* ✅ SEO (15.1) — REACT 19 SAFE */
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

  /* ✅ SEO (15.3D) — STRUCTURED DATA (JSON-LD) */
useEffect(() => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": tool.category,
    "operatingSystem": "Web",
    "description": tool.description,
    "url": tool.url
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

      {/* 🦸 Hero Section */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">

          {/* 🖼️ Tool Logo */}
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
          <a
  href={`/#/go/${tool.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center
             bg-indigo-600 hover:bg-indigo-700
             text-white px-6 py-3 rounded-lg font-semibold"
>
  🚀 Visit Official Website
</a>


          <span className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400">
            ⭐ Trusted by developers worldwide
          </span>
        </div>
      </div>

      {/* 🔁 Related Tools (SEO-Optimized) */}
{relatedTools.length > 0 && (
  <section
    className="max-w-5xl mx-auto mt-12"
    aria-labelledby="related-tools-heading"
  >
    <h2
      id="related-tools-heading"
      className="text-2xl font-bold mb-6 dark:text-white"
    >
      <p className="sr-only">
  Discover similar AI tools in the {tool.category} category.
</p>

      🔗 Related AI Tools in {tool.category}
    </h2>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {relatedTools.map(rt => (
        <a
          key={rt.id}
          href={`/#/tools/${rt.slug}`}
          className="block focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
          title={`${rt.name} – ${rt.category} AI Tool`}
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
