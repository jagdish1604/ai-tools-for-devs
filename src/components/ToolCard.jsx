import { useNavigate } from "react-router-dom";

export default function ToolCard({
  tool,
  favorites = [],
  onToggleFavorite
}) {
  const navigate = useNavigate();
  const isFavorite = favorites.includes(tool.id);

  const handleCardClick = () => {
    navigate(`/tools/${tool.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative cursor-pointer rounded-xl border border-slate-200
                 dark:border-slate-700 bg-white dark:bg-slate-800
                 p-6 hover:shadow-lg transition"
    >
      {/* Featured */}
      {tool.featured && (
        <span className="absolute top-3 right-3 text-xs font-semibold
                         bg-yellow-400 text-black px-3 py-1 rounded-full">
          ⭐ Featured
        </span>
      )}

      {/* Favorite */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 🔑 VERY IMPORTANT
          onToggleFavorite(tool.id);
        }}
        className="absolute top-3 left-3 text-xl"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Content */}
      <h3 className="text-xl font-semibold mb-2 mt-6 dark:text-white">
        {tool.name}
      </h3>

      <p className="text-slate-600 dark:text-slate-400 mb-4">
        {tool.description}
      </p>

      <span className="inline-block text-xs bg-slate-100 dark:bg-slate-700
                       text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
        {tool.category}
      </span>
    </div>
  );
}
