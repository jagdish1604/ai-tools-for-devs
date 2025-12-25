export default function ToolModal({ tool, onClose }) {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-slate-800 rounded-xl max-w-lg w-full p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 dark:hover:text-white"
        >
          ✕
        </button>

        {/* Featured Badge */}
        {tool.featured && (
          <span className="inline-block mb-3 text-xs font-semibold bg-yellow-400 text-black px-3 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold mb-3 dark:text-white">
          {tool.name}
        </h2>

        {/* Category */}
        <span className="inline-block text-xs bg-slate-100 dark:bg-slate-700
                         text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full mb-4">
          {tool.category}
        </span>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {tool.description}
        </p>

        {/* Visit Button */}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 hover:bg-indigo-700
                     text-white px-5 py-2 rounded-lg font-medium"
        >
          Visit Tool →
        </a>
      </div>
    </div>
  );
}
