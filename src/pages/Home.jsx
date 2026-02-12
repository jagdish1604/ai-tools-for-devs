import { useState, useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import toolsData from "../data/tools.json";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ToolGrid from "../components/ToolGrid";
import DarkModeToggle from "../components/DarkModeToggle";
import SortDropdown from "../components/SortDropdown";
import ToolModal from "../components/ToolModal";
import FeaturedCarousel from "../components/FeaturedCarousel";
import { Helmet } from "react-helmet-async";



const EmailSignup = lazy(() => import("../components/EmailSignup"));

export default function Home() {
  /* 🔄 Last updated */
  const lastUpdated = new Date(
    Math.max(...toolsData.map(t => new Date(t.addedAt)))
  ).toLocaleDateString();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [selectedTool, setSelectedTool] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  /* Weekly logic */
  const isThisWeek = (date) => {
    const diff =
      (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  };

  /* Categories */
  const categories = [
    "All",
    ...Array.from(new Set(toolsData.map(t => t.category)))
  ];

  /* Filter */
  const filteredTools = useMemo(() => {
    return toolsData.filter(tool => {
      const matchesSearch = tool.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "All" || tool.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  /* Sort */
  const sortTools = (tools) => {
    return [...tools].sort((a, b) => {
      if (sort === "newest") return new Date(b.addedAt) - new Date(a.addedAt);
      if (sort === "oldest") return new Date(a.addedAt) - new Date(b.addedAt);
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "za") return b.name.localeCompare(a.name);
      return 0;
    });
  };

  const weeklyTools = sortTools(filteredTools.filter(t => isThisWeek(t.addedAt)));
  const featuredTools = sortTools(filteredTools.filter(t => t.featured));
  const recentTools = sortTools(filteredTools.filter(t => !t.featured));

  /* Favorites */
  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const updated = prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">

      <Helmet>
  {/* 1. Primary Meta Tags - Enhanced for CTR (Click Through Rate) */}
  <title>240+ Best AI Tools for Developers (2026) | Free Developer Hub</title>
  <meta 
    name="description" 
    content="The ultimate directory of 240+ AI tools for developers. Free built-in JSON Formatter, Regex Tester, and AI coding assistants. Updated weekly for 2026." 
  />
  <meta name="keywords" content="AI tools for developers, free json formatter, regex tester online, AI coding tools 2026, best dev tools hub, artificial intelligence for programmers" />
  <link rel="canonical" href="https://aitoolsfordev.com/" />
  
  {/* 2. Mobile & Web Performance Tags */}
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
  <meta name="theme-color" content="#4f46e5" /> {/* Matches your indigo theme */}
  <meta name="robots" content="index, follow" />

  {/* 3. Open Graph - For Viral Sharing (WhatsApp, LinkedIn, FB) */}
  <meta property="og:site_name" content="AI Tools Hub" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="240+ AI Tools to Supercharge Your Development" />
  <meta property="og:description" content="Stop searching, start building. Access 240+ curated AI tools and free developer utilities in one place." />
  <meta property="og:url" content="https://aitoolsfordev.com/" />
  <meta property="og:image" content="https://aitoolsfordev.com/Sitelogo.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  {/* 4. Twitter - Optimized for Dev Community */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@aitoolshub" /> {/* Agar Twitter account hai toh handle dalo */}
  <meta name="twitter:title" content="The Best AI Directory for Developers" />
  <meta name="twitter:description" content="Curated list of 240+ AI tools + Free Built-in JSON & Regex Utilities." />
  <meta name="twitter:image" content="https://aitoolsfordev.com/Sitelogo.png" />

  {/* 5. 🚀 ADVANCED SCHEMA (JSON-LD) - Helping Google understand your content */}
  <script type="application/ld+json">
    {JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AI Tools Hub",
        "url": "https://aitoolsfordev.com/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://aitoolsfordev.com/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "AI Tools Hub",
        "url": "https://aitoolsfordev.com/",
        "logo": "https://aitoolsfordev.com/Sitelogo.png",
        "sameAs": [
          "https://twitter.com/yourhandle",
          "https://github.com/yourrepo"
        ]
      }
    ])}
  </script>
</Helmet>



      {/* 🌈 HERO */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 flex justify-between items-start gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Best AI Tools for Developers (240+ Tools)

            </h1>
            <p className="text-indigo-100 max-w-2xl text-lg">
              240+ curated AI tools for developers, creators, and startups.
              Updated weekly.
            </p>

            <div className="mt-6 flex gap-4">
             <button
  onClick={() =>
    document.getElementById("tools")?.scrollIntoView({
      behavior: "smooth",
    })
  }
  className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold"
>
  🔍 Explore Tools
</button>

              <Link
  to="/submit"
  className="border border-white/40 px-6 py-3 rounded-lg font-semibold"
>
  ➕ Submit Tool
</Link>
            </div>
          </div>

          <DarkModeToggle />
        </div>
      </div>

      <div id="tools" className="max-w-7xl mx-auto px-4 py-12">

        {/* 📊 STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            ["240+", "AI Tools"],
            [categories.length - 1, "Categories"],
            ["Weekly", "Updates"],
            ["Free", "Forever"]
          ].map(([v, l]) => (
            <div key={l} className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{v}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{l}</div>
            </div>
          ))}
        </div>

        

        {/* SEARCH */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            categories={categories}
            selected={category}
            onChange={setCategory}
          />
          <SortDropdown value={sort} onChange={setSort} />
        </div>
        {/* 🧰 Developer Tools */}
<section className="mb-14">
  <h2 className="text-2xl font-bold mb-4 dark:text-white">
    🧰 Developer Tools
  </h2>

  <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-3xl">
    Free, fast, and privacy-friendly developer utilities built into AI Tools Hub.
    No sign-up. Runs entirely in your browser.
  </p>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* JSON Formatter */}
    <a
      href="/dev-tools/json-formatter"
      className="group rounded-2xl p-6
    bg-white dark:bg-slate-800
    border border-slate-200 dark:border-slate-700
    text-slate-800 dark:text-slate-200
    shadow hover:shadow-lg
    transition-all duration-200"
    >
      <div className="text-3xl mb-3">🧾</div>
      <h3 className="text-lg font-bold mb-1 group-hover:text-indigo-600">
        JSON Formatter & Tree Viewer
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Format, minify, validate, and visually explore JSON data.
      </p>
    </a>

    {/* Regex Tester */}
    <a
      href="/dev-tools/regex-tester"
      className="group rounded-2xl p-6
    bg-white dark:bg-slate-800
    border border-slate-200 dark:border-slate-700
    text-slate-800 dark:text-slate-200
    shadow hover:shadow-lg
    transition-all duration-200"
    >
      <div className="text-3xl mb-3">🔍</div>
      <h3 className="text-lg font-bold mb-1 group-hover:text-indigo-600">
        Regex Tester
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Test, debug, and validate regular expressions instantly.
      </p>
    </a>

  </div>
</section>


        {/* CATEGORY LINKS */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.filter(c => c !== "All").map(c => (
            <Link
              key={c}
              to={`/category/${encodeURIComponent(c)}`}
              className="text-xs px-3 py-1 rounded-full
                         bg-slate-100 dark:bg-slate-700
                         hover:bg-indigo-100 dark:hover:bg-slate-600"
            >
              {c}
            </Link>
          ))}
        </div>
          {/* 🔍 SEO ENTRY PAGES (SAFE UI PLACEMENT) */}
<section className="mb-14">
  <h2 className="text-2xl font-bold mb-6 dark:text-white">
    Popular AI Tool Guides for Developers
  </h2>

  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <li>
      <Link
        to="/best-ai-tools-for-developers"
        className="text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        Best AI Tools for Developers
      </Link>
    </li>

    <li>
      <Link
        to="/ai-tools-for-dotnet-developers"
        className="text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        AI Tools for .NET Developers
      </Link>
    </li>

    <li>
      <Link
        to="/ai-tools-for-react-developers"
        className="text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        AI Tools for React Developers
      </Link>
    </li>

    <li>
      <Link
        to="/free-ai-tools-for-coding"
        className="text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        Free AI Tools for Coding
      </Link>
    </li>

    <li>
      <Link
        to="/chatgpt-alternatives-for-developers"
        className="text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        ChatGPT Alternatives for Developers
      </Link>
    </li>
    
  </ul>
</section>



        {/* 🆕 NEW THIS WEEK */}
        {weeklyTools.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              🆕 New This Week
            </h2>
            <ToolGrid
              tools={weeklyTools}
              onToolClick={setSelectedTool}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </section>
        )}

        {/* 🌟 FEATURED */}
        {featuredTools.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              🌟 Featured Tools
            </h2>
            <FeaturedCarousel
              tools={featuredTools}
              onToolClick={setSelectedTool}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </section>
        )}

        {/* 🆕 RECENT */}
        {recentTools.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              🆕 Recently Added
            </h2>
            <ToolGrid
              tools={recentTools}
              onToolClick={setSelectedTool}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </section>
        )}

        {/* 📩 EMAIL */}
        <Suspense fallback={null}>
          <EmailSignup />
        </Suspense>
      </div>

      {/* 🔝 SCROLL TOP */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-full shadow"
      >
        ↑
      </button>

      {/* MODAL */}
      <ToolModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
      />
    </div>
  );
}
