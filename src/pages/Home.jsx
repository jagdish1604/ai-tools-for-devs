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

      {/* 🌈 HERO */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 flex justify-between items-start gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Discover the Best AI Tools
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

              <a
                href="/#/submit"
                className="border border-white/40 px-6 py-3 rounded-lg font-semibold"
              >
                ➕ Submit Tool
              </a>
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

        {/* 🔄 LAST UPDATED */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          🔄 Last updated on {lastUpdated}
        </p>

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
