import ToolCard from "./ToolCard";

export default function ToolGrid({
  tools,
  favorites,
  onToggleFavorite
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map(tool => (
        <ToolCard
          key={tool.id}
          tool={tool}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
