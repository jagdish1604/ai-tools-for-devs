import ToolCard from "./ToolCard"

export default function ToolGrid({ tools }) {
  if (tools.length === 0) {
    return <p>No tools found.</p>
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map(tool => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}
