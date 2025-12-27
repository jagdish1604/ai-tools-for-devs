import { useParams } from "react-router-dom";
import { useEffect } from "react";
import tools from "../data/tools.json";

export default function GoRedirect() {
  const { slug } = useParams();

  /* ✅ 15.4 — NOINDEX / NOFOLLOW FOR REDIRECT PAGES */
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]');

    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.name = "robots";
      document.head.appendChild(metaRobots);
    }

    metaRobots.content = "noindex, nofollow";

    return () => {
      metaRobots.content = "index, follow";
    };
  }, []);

  /* 🔁 Redirect Logic */
  useEffect(() => {
    const tool = tools.find(t => t.slug === slug);

    if (!tool) {
      window.location.replace("/#/");
      return;
    }

    const targetUrl = tool.affiliateUrl || tool.url;

    // 📊 Analytics tracking
    window.gtag?.("event", "visit_tool", {
      tool_name: tool.name,
      category: tool.category,
      is_affiliate: !!tool.affiliateUrl,
    });

    // 🚀 Redirect
    window.location.replace(targetUrl);
  }, [slug]);

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-500">
      Redirecting…
    </div>
  );
}
