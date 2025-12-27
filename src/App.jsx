import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GoRedirect from "./pages/GoRedirect";
import { lazy, Suspense } from "react";

const ToolDetail = lazy(() => import("./pages/ToolDetail"));

function App() {
  return (



<Suspense fallback={<div className="p-8">Loading…</div>}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tools/:slug" element={<ToolDetail />} />
    <Route path="/go/:slug" element={<GoRedirect />} />
  </Routes>
</Suspense>

  );
}

export default App;
