import { useState } from "react";
import toolsData from "../data/tools.json";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ToolGrid from "../components/ToolGrid";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Dynamic categories from toolsData
  const categories = ["All", ...Array.from(new Set(toolsData.map(tool => tool.category)))];

  // Filter tools based on search and category
  const filteredTools = toolsData.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || tool.category === category;
    return matchesSearch && matchesCategory;
  });

  // Featured Tools (true & sorted by addedAt desc)
  const featuredTools = filteredTools
    .filter(tool => tool.featured)
    .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

  // Recently Added Tools (excluding featured)
  const recentTools = filteredTools
    .filter(tool => !tool.featured)
    .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 dark:text-white">
            Discover the Best AI Tools
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            A curated list of powerful AI tools for developers, creators, and startups. Updated weekly.
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
      </div>

      <p className="sr-only">
        Browse AI tools by category, search AI-powered applications, and discover productivity tools for developers, startups, and creators.
      </p>

      {/* Featured Tools Section */}
      {featuredTools.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">🌟 Featured Tools</h2>
          <ToolGrid tools={featuredTools} />
        </section>
      )}

      {/* Recently Added Section */}
      {recentTools.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 dark:text-white">🆕 Recently Added</h2>
          <ToolGrid tools={recentTools} />
        </section>
      )}
    </div>
  );
}
