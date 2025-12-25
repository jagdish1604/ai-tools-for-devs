import { useState } from "react"
import toolsData from "../data/tools.json"
import SearchBar from "../components/SearchBar"
import CategoryFilter from "../components/CategoryFilter"
import ToolGrid from "../components/ToolGrid"
import DarkModeToggle from "../components/DarkModeToggle"

const categories = ["All", "AI Chat", "Image Generation", "Developer Tools"]

export default function Home() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filteredTools = toolsData.filter(tool => {
    const matchesSearch = tool.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      category === "All" || tool.category === category

    return matchesSearch && matchesCategory
  })

  return (
  <div className="max-w-7xl mx-auto px-4 py-12 bg-slate-50 dark:bg-slate-900 min-h-screen">


      <div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-4xl font-extrabold mb-2 dark:text-white">
      Discover the Best AI Tools
    </h1>
    <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
      A curated list of powerful AI tools for developers, creators, and startups.
      Updated weekly.
    </p>
  </div>

  <DarkModeToggle />
</div>


      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={setCategory}
        />
      </div>
       <p className="sr-only">
      Browse AI tools by category, search AI-powered applications, and discover
      productivity tools for developers, startups, and creators.
    </p>
      <ToolGrid tools={filteredTools} />
    </div>
  )
}
