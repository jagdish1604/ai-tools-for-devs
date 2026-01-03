import ToolCard from "./ToolCard";

export default function FeaturedCarousel({
  tools,
  onToolClick,
  favorites,
  onToggleFavorite
}) {
  return (
    <div className="relative">
      <div
        className="flex gap-6 overflow-x-auto pb-4
                   snap-x snap-mandatory
                   scrollbar-thin scrollbar-thumb-slate-300
                   dark:scrollbar-thumb-slate-600"
      >
        {tools.map(tool => (
          <div
            key={tool.id}
            className="min-w-[280px] max-w-[280px]
                       snap-start"
          >
            <ToolCard
              tool={tool}
              onClick={onToolClick}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
