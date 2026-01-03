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
      className="group relative cursor-pointer
                 rounded-2xl border border-slate-200
                 dark:border-slate-700
                 bg-white dark:bg-slate-800
                 p-5 transition
                 hover:shadow-xl hover:-translate-y-1"
    >

      {/* ⭐ FEATURED BADGE */}
      {tool.featured && (
        <span className="absolute top-3 left-3
                         bg-indigo-600 text-white
                         text-xs font-semibold
                         px-3 py-1 rounded-full">
          ⭐ Featured
        </span>
      )}

      {/* ❤️ FAVORITE */}
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // 🔑 DO NOT REMOVE
            onToggleFavorite(tool.id);
          }}
          className="absolute top-3 right-3
                     p-2 rounded-full
                     bg-slate-100 dark:bg-slate-700
                     hover:bg-red-100 dark:hover:bg-red-900
                     transition text-sm"
          aria-label="Toggle favorite"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      )}

      {/* 🖼 LOGO */}
      <div className="mb-4 w-14 h-14
                      rounded-xl bg-slate-100
                      dark:bg-slate-700
                      flex items-center justify-center
                      overflow-hidden">
        {tool.logo ? (
          <img
            src={tool.logo}
            alt={`${tool.name} logo`}
            width="56"
            height="56"
            loading="lazy"
            decoding="async"
            className="object-contain"
          />
        ) : (
          <span className="text-xl font-bold text-slate-400">
            {tool.name.charAt(0)}
          </span>
        )}
      </div>

      {/* 🧠 TITLE */}
      <h3 className="text-lg font-semibold mb-1
                     text-slate-900 dark:text-white
                     group-hover:text-indigo-600
                     line-clamp-1">
        {tool.name}
      </h3>

      {/* 📝 DESCRIPTION */}
      <p className="text-sm text-slate-600
                    dark:text-slate-400
                    line-clamp-2 mb-4">
        {tool.description}
      </p>

      {/* 🏷 CATEGORY + CTA */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs px-3 py-1
                         rounded-full
                         bg-slate-100 dark:bg-slate-700
                         text-slate-600 dark:text-slate-300">
          {tool.category}
        </span>

        <span className="text-xs font-semibold
                         text-indigo-600 dark:text-indigo-400">
          View →
        </span>
      </div>
    </div>
  );
}
