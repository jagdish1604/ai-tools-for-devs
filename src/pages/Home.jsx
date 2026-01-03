import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import toolsData from "../data/tools.json";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ToolGrid from "../components/ToolGrid";
import DarkModeToggle from "../components/DarkModeToggle";
import SortDropdown from "../components/SortDropdown";
import ToolModal from "../components/ToolModal";
import FeaturedCarousel from "../components/FeaturedCarousel";
import { lazy, Suspense } from "react";


export default function Home() {
  /* 🔄 Auto Last Updated */
  const lastUpdated = new Date(
    Math.max(...toolsData.map(t => new Date(t.addedAt)))
  ).toLocaleDateString();

const EmailSignup = lazy(() => import("../components/EmailSignup"));
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [selectedTool, setSelectedTool] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  /* Weekly logic */
  const isThisWeek = (date) => {
    const now = new Date();
    const d = new Date(date);
    const diff = (now - d) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  };

  /* Dynamic categories */
  const categories = [
    "All",
    ...Array.from(new Set(toolsData.map(tool => tool.category)))
  ];

  /* Filtered tools */
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

  /* Sorting */
  const sortTools = (tools) => {
    return [...tools].sort((a, b) => {
      if (sort === "newest") return new Date(b.addedAt) - new Date(a.addedAt);
      if (sort === "oldest") return new Date(a.addedAt) - new Date(b.addedAt);
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "za") return b.name.localeCompare(a.name);
      return 0;
    });
  };

  /* Sections */
  const weeklyTools = sortTools(
    filteredTools.filter(tool => isThisWeek(tool.addedAt))
  );

  const featuredTools = sortTools(
    filteredTools.filter(tool => tool.featured)
  );

  const recentTools = sortTools(
    filteredTools.filter(tool => !tool.featured)
  );

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
    <div className="max-w-7xl mx-auto px-4 py-12 bg-slate-50 dark:bg-slate-900 min-h-screen">

      {/* 🌈 HERO */}
      <div className="relative mb-12 rounded-2xl overflow-hidden
                      bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600
                      dark:from-indigo-700 dark:via-indigo-600 dark:to-purple-700">
        <div className="px-8 py-14 flex flex-col md:flex-row
                        items-start md:items-center justify-between gap-6">

          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
              Discover the Best AI Tools
            </h1>

            <p className="text-indigo-100 max-w-2xl text-lg">
              240+ curated AI tools for developers, creators, and startups.
              Updated weekly. No fluff.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#tools"
                className="bg-white text-indigo-700
                           px-6 py-3 rounded-lg font-semibold
                           hover:bg-indigo-50 transition"
              >
                🔍 Explore Tools
              </a>

              <a
                href="/#/submit"
                className="border border-white/30 text-white
                           px-6 py-3 rounded-lg font-semibold
                           hover:bg-white/10 transition"
              >
                ➕ Submit a Tool
              </a>
            </div>
          </div>

          <DarkModeToggle />
        </div>
      </div>

{/* 🔥 HERO HIGHLIGHT */}
<div className="mb-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600
                text-white p-8 flex flex-col md:flex-row
                items-center justify-between gap-6">
  <div>
    <h2 className="text-3xl font-extrabold mb-2">
      Explore 240+ AI Tools 🚀
    </h2>
    <p className="text-indigo-100 max-w-xl">
      Discover hand-picked AI tools for developers, creators, startups, and teams.
      Updated weekly.
    </p>
  </div>

  <div className="flex gap-6 text-center">
    <div>
      <p className="text-3xl font-bold">{toolsData.length}+</p>
      <p className="text-sm text-indigo-200">Tools</p>
    </div>
    <div>
      <p className="text-3xl font-bold">{categories.length - 1}</p>
      <p className="text-sm text-indigo-200">Categories</p>
    </div>
  </div>
</div>

      <div id="tools"></div>

      {/* ✅ TRUST STRIP */}
<div className="mb-12">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4
                  bg-white dark:bg-slate-800
                  border border-slate-200 dark:border-slate-700
                  rounded-2xl p-6 text-center">

    <div>
      <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
        240+
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        AI Tools Listed
      </p>
    </div>

    <div>
      <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
        Weekly
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Updates
      </p>
    </div>

    <div>
      <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
        Developer-First
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Curated Tools
      </p>
    </div>

    <div>
      <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
        No Spam
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        No Ads (Yet)
      </p>
    </div>

  </div>
</div>

<p className="sr-only">
  AI Tools Hub is trusted by developers, startups, and creators worldwide.
  Explore curated AI software, productivity tools, and developer resources.
</p>


      {/* 🔄 Last Updated */}
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
        🔄 Last updated on {lastUpdated}
      </p>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={setCategory}
        />
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {/* Category Links */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories
          .filter(c => c !== "All")
          .map(category => (
            <Link
              key={category}
              to={`/category/${encodeURIComponent(category)}`}
              className="text-xs px-3 py-1 rounded-full
                         bg-slate-100 dark:bg-slate-700
                         text-slate-700 dark:text-slate-300
                         hover:bg-indigo-100 dark:hover:bg-slate-600"
            >
              {category}
            </Link>
          ))}
      </div>

      {/* SEO hidden text */}
      <p className="sr-only">
        Discover the best AI tools for developers, startups, and creators.
        Browse AI chat tools, image generation tools, developer productivity tools,
        and new AI software added weekly.
      </p>

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
<hr className="my-12 border-slate-200 dark:border-slate-700" />

      {/* 🌟 FEATURED (Horizontal Scroll) */}
{featuredTools.length > 0 && (
  <section className="mb-16">
    <h2 className="text-2xl font-bold mb-4 dark:text-white">
      🌟 Featured AI Tools (Editor’s Pick)
    </h2>

    <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl">
      Hand-picked AI tools trusted by developers and startups.
    </p>

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
        <section className="mb-14">
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

{/* ✅ TRUST STRIP */}
<div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
  <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow">
    ⚡ Curated tools only
  </div>
  <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow">
    🔍 No spam. No clutter.
  </div>
  <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow">
    📈 Updated every week
  </div>
</div>


      <div className="mt-16">
        <Suspense fallback={null}>
  <EmailSignup />
</Suspense>
<button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="fixed bottom-6 right-6 z-50
             bg-indigo-600 hover:bg-indigo-700
             text-white px-4 py-2 rounded-full shadow-lg"
>
  ↑ Top
</button>


      </div>

      {/* Modal */}
      <ToolModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
      />
    </div>
  );
}
