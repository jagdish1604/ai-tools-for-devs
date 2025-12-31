import { Link } from "react-router-dom";

export default function Advertise() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-16">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-4 dark:text-white">
          Advertise on AI Tools for Devs
        </h1>

        <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-3xl">
          Reach developers, founders, and creators actively searching for AI tools.
          We promote products transparently and ethically.
        </p>

        {/* Why section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-8 shadow">
          <h2 className="text-2xl font-bold mb-3 dark:text-white">
            Why partner with us?
          </h2>

          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
            <li>Targeted audience of developers & startups</li>
            <li>SEO-driven traffic (Google, Product Hunt, Reddit)</li>
            <li>Only relevant tools — no spam listings</li>
            <li>Clear disclosure & trust-first approach</li>
          </ul>
        </div>

        {/* Opportunities */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-8 shadow">
          <h2 className="text-2xl font-bold mb-3 dark:text-white">
            Promotion opportunities
          </h2>

          <ul className="space-y-2 text-slate-600 dark:text-slate-300">
            <li>⭐ Featured tool placement</li>
            <li>🔗 Affiliate traffic via tool pages</li>
            <li>📌 Sponsored listing (clearly marked)</li>
            <li>📈 Early access to new visitors</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-indigo-600 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">
            Want to feature your AI tool?
          </h3>

          <p className="mb-4 text-indigo-100">
            Contact us to discuss partnerships or submissions.
          </p>

          <a
            href="mailto:aitoolsfordev@gmail.com"
            className="inline-block bg-white text-indigo-600
                       px-6 py-3 rounded-lg font-semibold"
          >
            📩 Contact Us
          </a>
        </div>

        {/* Footer note */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-6">
          * Sponsored listings are always clearly disclosed.
        </p>
<p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
  Featured placements are editorially reviewed.
  Affiliate partnerships do not influence our recommendations.
</p>

        <div className="mt-8">
          <Link
            to="/"
            className="text-sm text-indigo-600 dark:text-indigo-400 underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
