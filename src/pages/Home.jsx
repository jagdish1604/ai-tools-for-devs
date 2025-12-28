import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import toolsData from "../data/tools.json";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ToolGrid from "../components/ToolGrid";
import DarkModeToggle from "../components/DarkModeToggle";
import SortDropdown from "../components/SortDropdown";
import ToolModal from "../components/ToolModal";

export default function Home() {
  /* 🔄 16.2.2 — Auto Last Updated */
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

  /* 🆕 16.2.3 — Weekly logic */
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

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 dark:text-white">
            Discover the Best AI Tools
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            A curated list of powerful AI tools for developers, creators, and startups.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <a
            href="/#/submit"
            className="inline-flex items-center px-4 py-2
                       bg-indigo-600 hover:bg-indigo-700
                       text-white rounded-lg text-sm font-semibold"
          >
            ➕ Submit a Tool
          </a>
        </div>
      </div>

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
      {/* 🔗 Category SEO Links */}
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
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
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

      {/* 🌟 Featured */}
      {featuredTools.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            🌟 Featured Tools
          </h2>
          <ToolGrid
            tools={featuredTools}
            onToolClick={setSelectedTool}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </section>
      )}

      {/* 🆕 Recently Added */}
      {recentTools.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
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

      {/* Modal */}
      <ToolModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
      />
    </div>
  );
}
