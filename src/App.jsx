import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GoRedirect from "./pages/GoRedirect";
import { lazy, Suspense } from "react";
 import SubmitTool from "./pages/SubmitTool";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import Advertise from "./pages/Advertise";
import { Analytics } from "@vercel/analytics/react";

const ToolDetail = lazy(() => import("./pages/ToolDetail"));

function App() {
  return (



<Suspense fallback={<div className="p-8">Loading…</div>}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tools/:slug" element={<ToolDetail />} />
    <Route path="/go/:slug" element={<GoRedirect />} />
    <Route path="/submit" element={<SubmitTool />} />
    <Route path="/category/:category" element={<CategoryPage />} />
    <Route path="/advertise" element={<Advertise />} />
  </Routes>
    <Footer />
    <Analytics />
</Suspense>

  );
}

export default App;
