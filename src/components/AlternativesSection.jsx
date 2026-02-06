import { Link } from "react-router-dom";
import ToolCard from "./ToolCard";

export default function AlternativesSection({ currentTool, alternatives }) {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        🔄 Alternatives to {currentTool.name}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {alternatives.map(tool => (
          <Link key={tool.slug} to={`/tools/${tool.slug}`}>
            <ToolCard tool={tool} />
          </Link>
        ))}
      </div>
    </section>
  );
}
