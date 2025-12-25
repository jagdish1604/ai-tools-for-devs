export default function ToolCard({ tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noreferrer"
      className="
        group block rounded-2xl border bg-white dark:bg-slate-800 p-6
        hover:shadow-xl transition-all duration-300
      "
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold group-hover:text-primary">
          {tool.name}
        </h3>
        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {tool.category}
        </span>
      </div>

      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">

        {tool.description}
      </p>

      <div className="mt-5 text-sm font-medium text-primary">
        Visit Tool →
      </div>
    </a>
  )
}
