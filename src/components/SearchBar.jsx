export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search AI tools..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
    />
  )
}
