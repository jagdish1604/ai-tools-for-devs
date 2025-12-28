export default function SubmitTool() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-16">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
          Submit Your AI Tool
        </h1>

        <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl">
          Have an AI tool to share? Submit it below and get discovered by developers,
          startups, and creators worldwide. We review submissions weekly.
        </p>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
          <form className="space-y-5">

            {/* Tool Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Tool Name
              </label>
              <input
                type="text"
                placeholder="e.g. Jasper AI"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600
                           bg-white dark:bg-slate-900
                           text-slate-900 dark:text-white
                           px-4 py-3 focus:outline-none focus:ring-2
                           focus:ring-indigo-500"
                required
              />
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Official Website URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600
                           bg-white dark:bg-slate-900
                           text-slate-900 dark:text-white
                           px-4 py-3 focus:outline-none focus:ring-2
                           focus:ring-indigo-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Category
              </label>
              <input
                type="text"
                placeholder="AI Chat, Design, Developer Tools, etc."
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600
                           bg-white dark:bg-slate-900
                           text-slate-900 dark:text-white
                           px-4 py-3 focus:outline-none focus:ring-2
                           focus:ring-indigo-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Short Description
              </label>
              <textarea
                placeholder="What does your tool do? Keep it short and clear."
                rows={4}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600
                           bg-white dark:bg-slate-900
                           text-slate-900 dark:text-white
                           px-4 py-3 focus:outline-none focus:ring-2
                           focus:ring-indigo-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto inline-flex items-center justify-center
                         bg-indigo-600 hover:bg-indigo-700
                         text-white px-8 py-3 rounded-lg font-semibold
                         transition"
            >
              🚀 Submit Tool
            </button>

          </form>
        </div>

        {/* Trust text */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-6">
          ⏱️ Submissions are reviewed manually. No spam. Quality tools only.
        </p>

      </div>
    </div>
  );
}
