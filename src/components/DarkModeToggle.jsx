import { useEffect, useState } from "react"

export default function DarkModeToggle() {
  const [dark, setDark] = useState(
    localStorage.theme === "dark"
  )

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark")
      localStorage.theme = "dark"
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.theme = "light"
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="
        px-4 py-2 rounded-lg border text-sm font-medium
        bg-white dark:bg-slate-800
        text-slate-800 dark:text-slate-100
        hover:bg-slate-100 dark:hover:bg-slate-700
        transition
      "
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  )
}
