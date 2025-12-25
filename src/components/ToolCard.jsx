export default function ToolCard({ tool, onClick, onToggleFavorite, isFavorite }) {
  return (
    <div
      onClick={() => onClick(tool)}
      className="relative cursor-pointer rounded-xl border border-slate-200
                 dark:border-slate-700 bg-white dark:bg-slate-800
                 p-6 hover:shadow-lg transition"
    >

      {/* ⭐ Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 🚨 prevent modal open
          onToggleFavorite(tool.id);
        }}
        className="absolute top-3 left-3 text-xl"
      >
        {isFavorite ? "⭐" : "☆"}
      </button>

      {tool.featured && (
        <span className="absolute top-3 right-3 text-xs font-semibold
                         bg-yellow-400 text-black px-3 py-1 rounded-full">
          Featured
        </span>
      )}

      <h3 className="text-xl font-semibold mb-2 dark:text-white">
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
