import { useState } from "react";
import toolsData from "../data/tools.json";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ToolGrid from "../components/ToolGrid";
import DarkModeToggle from "../components/DarkModeToggle";
import SortDropdown from "../components/SortDropdown";
import ToolModal from "../components/ToolModal";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
const [sort, setSort] = useState("newest");
const [selectedTool, setSelectedTool] = useState(null);
const [favorites, setFavorites] = useState(() => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
});

  // Dynamic categories from toolsData
  const categories = ["All", ...Array.from(new Set(toolsData.map(tool => tool.category)))];

  // Filter tools based on search and category
  const filteredTools = toolsData.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || tool.category === category;
    return matchesSearch && matchesCategory;
  });
const toggleFavorite = (id) => {
  setFavorites(prev => {
    const updated = prev.includes(id)
      ? prev.filter(f => f !== id)
      : [...prev, id];

    localStorage.setItem("favorites", JSON.stringify(updated));
    return updated;
  });
};

  const sortTools = (tools) => {
  return [...tools].sort((a, b) => {
    if (sort === "newest") return new Date(b.addedAt) - new Date(a.addedAt);
    if (sort === "oldest") return new Date(a.addedAt) - new Date(b.addedAt);
    if (sort === "az") return a.name.localeCompare(b.name);
    if (sort === "za") return b.name.localeCompare(a.name);
    return 0;
  });
};

const featuredTools = sortTools(
  filteredTools.filter(tool => tool.featured)
);

const recentTools = sortTools(
  filteredTools.filter(tool => !tool.featured)
);
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
      <DarkModeToggle />
    </div>

    {/* Search + Category */}
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <SearchBar value={search} onChange={setSearch} />
      <CategoryFilter
        categories={categories}
        selected={category}
        onChange={setCategory}
      />
      <SortDropdown value={sort} onChange={setSort} />
    </div>
<p className="sr-only">
  Discover the best AI tools for developers, startups, and creators.
  Browse AI chat tools, image generation tools, developer productivity tools,
  and new AI software added weekly.
</p>

    {/* Featured */}
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

    {/* Recent */}
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

    {/* ✅ MODAL MUST BE HERE */}
    <ToolModal
      tool={selectedTool}
      onClose={() => setSelectedTool(null)}
    />

  </div>
);


}
