import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GoRedirect from "./pages/GoRedirect";
import { lazy, Suspense } from "react";
 import SubmitTool from "./pages/SubmitTool";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import Advertise from "./pages/Advertise";
import { Analytics } from "@vercel/analytics/react";
import BestAiToolsForDevelopers from "./pages/seo/BestAiToolsForDevelopers";
import AiToolsForDotNetDevelopers from "./pages/seo/AiToolsForDotNetDevelopers";
import AiToolsForReactDevelopers from "./pages/seo/AiToolsForReactDevelopers";
import FreeAiToolsForCoding from "./pages/seo/FreeAiToolsForCoding";
import ChatGptAlternativesForDevelopers from "./pages/seo/ChatGptAlternativesForDevelopers";
import ComparePage from "./pages/ComparePage";
import RegexTester from "./pages/RegexTester";
import JsonFormatter from "./pages/JsonFormatter";






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
    <Route path="/best-ai-tools-for-developers" element={<BestAiToolsForDevelopers />}/>
    <Route path="/ai-tools-for-dotnet-developers" element={<AiToolsForDotNetDevelopers />}/>
    <Route path="/ai-tools-for-dotnet-developers"element={<AiToolsForDotNetDevelopers />}/>
    <Route
  path="/free-ai-tools-for-coding"
  element={<FreeAiToolsForCoding />}
/>
<Route
  path="/chatgpt-alternatives-for-developers"
  element={<ChatGptAlternativesForDevelopers />}
/>
<Route
  path="/ai-tools-for-react-developers"
  element={<AiToolsForReactDevelopers />}
/>
<Route path="/compare/:slugs" element={<ComparePage />} />
<Route path="/dev-tools/regex-tester" element={<RegexTester />} />
<Route path="/dev-tools/json-formatter" element={<JsonFormatter />} />


  </Routes>
    <Footer />
    <Analytics />
</Suspense>

  );
}

export default App;
