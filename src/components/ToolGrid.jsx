import ToolCard from "./ToolCard";

export default function ToolGrid({
  tools,
  onToolClick,
  favorites,
  onToggleFavorite
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map(tool => (
        <ToolCard
          key={tool.id}
          tool={tool}
          onClick={onToolClick}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(tool.id)}
        />
      ))}
    </div>
  );
}
