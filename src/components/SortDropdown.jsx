export default function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-48 rounded-lg border border-slate-300
                 dark:border-slate-600 bg-white dark:bg-slate-800
                 text-slate-800 dark:text-white px-4 py-2"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="az">A → Z</option>
      <option value="za">Z → A</option>
    </select>
  );
}
