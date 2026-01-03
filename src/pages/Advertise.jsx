import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Advertise() {
  useEffect(() => {
    document.title = "Advertise on AI Tools Hub – Feature Your AI Tool";
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-12">
      <div className="max-w-4xl mx-auto">

        {/* 🔙 Back */}
        <Link
          to="/"
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          ← Back to Home
        </Link>

        {/* 🦸 Hero */}
        <div className="mt-6 mb-10">
          <h1 className="text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
            Feature Your AI Tool on AI Tools Hub
          </h1>

          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            Reach developers, founders, and early adopters who are actively
            searching for AI tools. Get visibility without spammy ads.
          </p>
        </div>

        {/* ✅ Benefits */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            Why Feature Your Tool?
          </h2>

          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li>✔ Featured placement on the homepage</li>
            <li>✔ Visibility in relevant category pages</li>
            <li>✔ Direct traffic to your official website</li>
            <li>✔ Early traction for new launches</li>
            <li>✔ Founder-friendly, transparent platform</li>
          </ul>
        </div>

        {/* 💰 Plans */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            Featured Listing Plans
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                ⭐ Featured Listing
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                Highlight your tool on the homepage and category pages.
              </p>
              <ul className="text-sm text-slate-700 dark:text-slate-300 mb-4 space-y-1">
                <li>• Homepage highlight</li>
                <li>• Category page visibility</li>
                <li>• 7 days or 30 days</li>
              </ul>
              <p className="font-semibold text-slate-900 dark:text-white">
                7 days – $29<br />
                30 days – $79
              </p>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                🚀 Sponsored Listing
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                Custom placement and promotion options.
              </p>
              <ul className="text-sm text-slate-700 dark:text-slate-300 mb-4 space-y-1">
                <li>• Custom positioning</li>
                <li>• Newsletter mention (future)</li>
                <li>• Campaign-based exposure</li>
              </ul>
              <p className="font-semibold text-slate-900 dark:text-white">
                Contact us for pricing
              </p>
            </div>
          </div>
        </div>

        {/* 🔐 Trust */}
        <div className="bg-indigo-50 dark:bg-slate-800 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold mb-2 dark:text-white">
            Transparency & Trust
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            We review every submission manually.  
            Affiliate partnerships do not influence our recommendations.
          </p>
        </div>

        {/* 📩 Contact CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3 dark:text-white">
            Ready to Feature Your Tool?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Email us with your tool details and preferred plan.
          </p>

          <a
            href="mailto:contact@aitoolsfordev.com"
            className="inline-flex items-center justify-center
                       bg-indigo-600 hover:bg-indigo-700
                       text-white px-6 py-3 rounded-lg font-semibold"
          >
            📧 jagdishpatil81539@gmail.com
          </a>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
            We usually respond within 24–48 hours.
          </p>
        </div>

      </div>
    </div>
  );
}
