// import { useState, useMemo } from "react";
// import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";
// import regexExamples from "../data/regexExamples";

// /* ---------------- PRESETS ---------------- */
// const PRESETS = [
//   {
//     name: "Email",
//     pattern: "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b",
//     flags: { g: true, i: false, m: false, s: false },
//     text: "test@example.com\nhello@site.org\ninvalid@email"
//   },
//   {
//     name: "URL",
//     pattern: "https?:\\/\\/(www\\.)?[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
//     flags: { g: true, i: true, m: false, s: false },
//     text: "https://google.com\nhttp://example.org\nftp://site.com"
//   },
//   {
//     name: "Phone",
//     pattern: "\\+?\\d{1,3}[\\s-]?\\d{6,14}",
//     flags: { g: true, i: false, m: false, s: false },
//     text: "+91 9876543210\n+1-2025550198\n12345"
//   }
// ];

// /* ---------------- EXPLAINER ---------------- */
// const explainRegex = (regex) => {
//   const rules = {
//     "\\d": "Matches any digit (0–9)",
//     "\\w": "Matches any word character",
//     "\\s": "Matches whitespace",
//     ".": "Matches any character",
//     "*": "0 or more times",
//     "+": "1 or more times",
//     "?": "Optional",
//     "^": "Start of line",
//     "$": "End of line",
//     "()": "Capturing group",
//     "[]": "Character set",
//     "|": "OR operator"
//   };

//   return Object.entries(rules)
//     .filter(([k]) => regex.includes(k))
//     .map(([_, v]) => v);
// };

// export default function RegexTester() {
//   const [pattern, setPattern] = useState("");
//   const [text, setText] = useState("");
//   const [search, setSearch] = useState("");
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [copied, setCopied] = useState(false);

//   const [flagOptions, setFlagOptions] = useState({
//     g: true,
//     i: false,
//     m: false,
//     s: false
//   });

//   const flags = Object.keys(flagOptions)
//     .filter(k => flagOptions[k])
//     .join("");

//   /* ---------- SIDEBAR FILTER ---------- */
//   const filteredExamples = useMemo(() => {
//     return regexExamples
//       .map(section => ({
//         ...section,
//         items: section.items.filter(item =>
//           item.title.toLowerCase().includes(search.toLowerCase())
//         )
//       }))
//       .filter(section => section.items.length > 0);
//   }, [search]);

//   /* ---------- REGEX EXECUTION ---------- */
//   const { matches, error, highlightedText, isValid } = useMemo(() => {
//     if (!pattern) {
//       return {
//         matches: [],
//         error: "",
//         highlightedText: text,
//         isValid: false
//       };
//     }

//     try {
//       const regex = new RegExp(pattern, flags);
//       const found = [...text.matchAll(regex)];

//       const highlighted = text.replace(regex, match =>
//         `<mark class="bg-yellow-300 dark:bg-yellow-600 px-1 rounded">${match}</mark>`
//       );

//       return {
//         matches: found,
//         error: "",
//         highlightedText: highlighted,
//         isValid: true
//       };
//     } catch (e) {
//       return {
//         matches: [],
//         error: e.message,
//         highlightedText: text,
//         isValid: false
//       };
//     }
//   }, [pattern, flags, text]);

//   const explanations = explainRegex(pattern);

//   const applyPreset = (preset) => {
//     setPattern(preset.pattern);
//     setFlagOptions(preset.flags);
//     setText(preset.text);
//   };

//   const copyRegex = () => {
//     if (!pattern) return;
//     navigator.clipboard.writeText(pattern);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-10">

//       <Helmet>
//         <title>Regex Tester & Explainer for Developers</title>
//         <meta
//           name="description"
//           content="Regex tester with sidebar, validation, match table, examples and live highlighting."
//         />
//         <link
//           rel="canonical"
//           href="https://aitoolsfordev.com/dev-tools/regex-tester"
//         />
//       </Helmet>

//       <div className="max-w-7xl mx-auto grid md:grid-cols-[260px_1fr] gap-6">

//         {/* ================= SIDEBAR ================= */}
//         <aside className={`${showSidebar ? "block" : "hidden"} md:block
//           bg-white dark:bg-slate-900
//           border border-slate-200 dark:border-slate-700
//           rounded-2xl p-4 h-[calc(100vh-140px)] overflow-y-auto`}>

//           <div className="flex justify-between items-center mb-3">
//             <h2 className="font-bold dark:text-white">Regex Library</h2>
//             <button
//               className="md:hidden text-sm text-indigo-600"
//               onClick={() => setShowSidebar(false)}
//             >
//               Close
//             </button>
//           </div>

//           <input
//             placeholder="Search regex…"
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="w-full mb-4 p-2 rounded-lg
//               bg-white dark:bg-slate-800
//               border dark:border-slate-700"
//           />

//           {filteredExamples.map(section => (
//             <div key={section.category} className="mb-4">
//               <h3 className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 mb-2">
//                 {section.category}
//               </h3>

//               <ul className="space-y-1">
//                 {section.items.map((item, i) => (
//                   <li key={i}>
//                     <button
//                       onClick={() => {
//                         setPattern(item.pattern);
//                         setText(item.test || "");
//                       }}
//                       className="w-full text-left px-2 py-1.5 rounded-md
//                         text-sm hover:bg-indigo-100 dark:hover:bg-slate-700"
//                     >
//                       {item.title}
//                       <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
//                         item.difficulty === "Advanced"
//                           ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
//                           : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
//                       }`}>
//                         {item.difficulty || "Beginner"}
//                       </span>
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </aside>

//         {/* ================= MAIN ================= */}
//         <main className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow p-6">

//           <div className="flex justify-between items-center mb-4">
//             <Link to="/" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
//               ← Back to Home
//             </Link>

//             <button
//               onClick={() => setShowSidebar(!showSidebar)}
//               className="md:hidden text-sm text-indigo-600"
//             >
//               {showSidebar ? "Hide Menu" : "Show Menu"}
//             </button>
//           </div>

//           <h1 className="text-3xl font-extrabold mb-2 dark:text-white">
//             Regex Tester & Explainer
//           </h1>

//           {/* ✅ VALIDATION BADGE */}
//           {pattern && (
//             <div className="mb-3">
//               <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
//                 ${isValid
//                   ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
//                   : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
//                 }`}>
//                 {isValid ? "✓ Valid Regex" : "✕ Invalid Regex"}
//               </span>
//             </div>
//           )}

//           {/* Pattern */}
//           <label className="font-semibold dark:text-white">Regex Pattern</label>
//           <input
//             value={pattern}
//             onChange={e => setPattern(e.target.value)}
//             className="w-full p-3 mt-1 mb-2 border rounded-lg dark:bg-slate-800"
//           />

//           <button onClick={copyRegex} className="text-sm text-indigo-600 dark:text-indigo-400">
//             {copied ? "✓ Copied!" : "Copy Regex"}
//           </button>

//           {/* FLAGS (unchanged) */}
//           <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm dark:text-slate-300">
//             {[
//               ["g", "Global"],
//               ["i", "Ignore case"],
//               ["m", "Multiline"],
//               ["s", "Dot all"]
//             ].map(([k, label]) => (
//               <label key={k} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={flagOptions[k]}
//                   onChange={() =>
//                     setFlagOptions(prev => ({ ...prev, [k]: !prev[k] }))
//                   }
//                 />
//                 {label}
//               </label>
//             ))}
//           </div>

//           <textarea
//             value={text}
//             onChange={e => setText(e.target.value)}
//             rows={6}
//             className="w-full p-3 border rounded-lg font-mono dark:bg-slate-800"
//           />

//           {error && <div className="text-red-600 mt-2">❌ {error}</div>}

//           <div
//             className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono mt-4 whitespace-pre-wrap"
//             dangerouslySetInnerHTML={{ __html: highlightedText || "No input text." }}
//           />

//           <p className="mt-2"><strong>Matches:</strong> {matches.length}</p>

//           {/* ✅ MATCH TABLE */}
//           {matches.length > 0 && (
//             <div className="overflow-x-auto mt-4">
//               <table className="w-full text-sm border border-slate-200 dark:border-slate-700">
//                 <thead className="bg-slate-100 dark:bg-slate-800">
//                   <tr>
//                     <th className="p-2 border">#</th>
//                     <th className="p-2 border">Match</th>
//                     <th className="p-2 border">Index</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {matches.map((m, i) => (
//                     <tr key={i}>
//                       <td className="p-2 border">{i + 1}</td>
//                       <td className="p-2 border font-mono">{m[0]}</td>
//                       <td className="p-2 border">{m.index}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Explanation */}
//           {explanations.length > 0 && (
//             <div className="mt-6">
//               <h2 className="font-semibold dark:text-white">Regex Explanation</h2>
//               <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400">
//                 {explanations.map((e,i) => <li key={i}>{e}</li>)}
//               </ul>
//             </div>
//           )}

//         </main>
//       </div>
//     </div>
//   );
// }

import { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  FiSearch, FiCopy, FiCheck, FiChevronRight, 
  FiMenu, FiX, FiInfo, FiCode, FiZap, FiArrowLeft, FiActivity
} from "react-icons/fi";
import regexExamples from "../data/regexExamples";

/* ---------------- EXPLAINER LOGIC ---------------- */
const explainRegex = (regex) => {
  const rules = {
    "\\d": "Matches any digit (0–9)",
    "\\w": "Matches alphanumeric (a-z, A-Z, 0-9, _)",
    "\\s": "Matches whitespace",
    ".": "Matches any character except newline",
    "*": "0 or more occurrences",
    "+": "1 or more occurrences",
    "?": "Optional character",
    "^": "Start of string",
    "$": "End of string",
    "\\b": "Word boundary",
    "[]": "Character set",
    "|": "OR operator"
  };
  return Object.entries(rules).filter(([k]) => regex.includes(k)).map(([_, v]) => v);
};

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}\\b");
  const [text, setText] = useState("Contact us at support@example.com or sales@site.org");
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [copied, setCopied] = useState(false);
  const [flagOptions, setFlagOptions] = useState({ g: true, i: true, m: false, s: false });

  const flags = Object.keys(flagOptions).filter(k => flagOptions[k]).join("");

  const filteredExamples = useMemo(() => {
    return regexExamples.map(section => ({
      ...section,
      items: section.items.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    })).filter(section => section.items.length > 0);
  }, [search]);

  const { matches, error, highlightedText, isValid } = useMemo(() => {
    if (!pattern) return { matches: [], error: "", highlightedText: text, isValid: false };
    try {
      const regex = new RegExp(pattern, flags);
      const found = [...text.matchAll(regex)];
      const highlighted = text.replace(regex, match => 
        `<mark class="bg-indigo-500/30 border-b-2 border-indigo-500 text-indigo-900 dark:text-indigo-100 px-0.5 rounded-t-sm transition-all">${match}</mark>`
      );
      return { matches: found, error: "", highlightedText: highlighted, isValid: true };
    } catch (e) {
      return { matches: [], error: e.message, highlightedText: text, isValid: false };
    }
  }, [pattern, flags, text]);

  const copyRegex = () => {
    navigator.clipboard.writeText(pattern);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#020617] text-slate-900 dark:text-slate-100">
      <Helmet>
        <title>Regex Tester Online | Debug & Explain Regular Expressions</title>
        <meta name="description" content="Free online Regex tester with live highlighting. Debug your regular expressions, get step-by-step explanations, and browse 100+ ready-to-use patterns." />
        <meta name="keywords" content="regex tester, regular expression debugger, javascript regex, online regex editor, regex cheatsheet" />
      </Helmet>

      {/* --- TOP NAV --- */}
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span> Back to Home</span>
            </Link>
            <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-2">
              <FiActivity className="text-indigo-600 animate-pulse" />
              <span className="font-bold tracking-tight">RegexEditor v2.0</span>
            </div>
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg md:hidden">
            {showSidebar ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-8">
        
        {/* --- LEFT SIDEBAR: LIBRARY --- */}
        <aside className={`${showSidebar ? "block" : "hidden"} md:block w-full md:w-72 flex-shrink-0 space-y-4`}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
              <FiCode className="text-indigo-500" /> Pattern Library
            </h3>
            <div className="relative mb-4">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                placeholder="Search 100+ patterns..." 
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredExamples.map(section => (
                <div key={section.category} className="mb-4">
                  <h4 className="text-[10px] uppercase font-black text-slate-400 mb-2 px-2">{section.category}</h4>
                  {section.items.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => { setPattern(item.pattern); setText(item.test || ""); }}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 transition-all flex items-center justify-between group"
                    >
                      <span className="truncate">{item.title}</span>
                      <FiChevronRight className="opacity-0 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 space-y-6">
          
          {/* Hero for SEO */}
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              The Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Regex Debugger.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
              Write, test, and analyze regular expressions with real-time feedback. 
              Use our library of pre-built patterns for common validation tasks.
            </p>
          </div>

          {/* Pattern Input Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Regex Input Area */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Regular Expression</label>
                  <div className="flex gap-2">
                    {['g', 'i', 'm', 's'].map(f => (
                      <button
                        key={f}
                        onClick={() => setFlagOptions(prev => ({ ...prev, [f]: !prev[f] }))}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${flagOptions[f] ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200"}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-mono text-xl">/</div>
                  <input
                    value={pattern}
                    onChange={e => setPattern(e.target.value)}
                    className={`w-full py-5 pl-8 pr-16 bg-slate-50 dark:bg-slate-950 border-2 font-mono text-lg rounded-2xl focus:outline-none transition-all ${isValid ? "border-slate-100 dark:border-slate-800 focus:border-indigo-500" : "border-red-500/50 focus:border-red-500"}`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-slate-300 font-mono text-xl">/</span>
                    <button onClick={copyRegex} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                      {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
                    </button>
                  </div>
                </div>
                {error && <p className="text-xs text-red-500 font-medium">Error: {error}</p>}
              </div>

              {/* Editor Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Test String</label>
                  <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="w-full h-64 p-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 outline-none font-mono text-sm leading-relaxed"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Highlighted Result</label>
                  <div 
                    className="w-full h-64 p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-y-auto font-mono text-sm leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: highlightedText || '<span class="text-slate-400">Waiting for input...</span>' }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-4 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Matches</span>
                  <span className="font-mono font-bold text-indigo-600">{matches.length}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                  <span className={`text-[11px] font-bold ${isValid ? "text-green-500" : "text-red-500"}`}>
                    {isValid ? "READY" : "INVALID"}
                  </span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">ENGINE: JAVASCRIPT (V8)</div>
            </div>
          </div>

          {/* Explanation Section */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                <FiInfo className="text-indigo-500" /> Pattern Analysis
              </h3>
              <div className="space-y-2">
                {explainRegex(pattern).map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-medium">
                    <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                    {rule}
                  </div>
                ))}
                {explainRegex(pattern).length === 0 && <p className="text-xs text-slate-400 italic">No special tokens identified yet.</p>}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Regex Master Tip</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  Did you know? The <code className="bg-white/20 px-1 rounded">?</code> quantifier makes a character optional, while <code className="bg-white/20 px-1 rounded">.*?</code> makes a search "lazy" instead of "greedy".
                </p>
              </div>
              <div className="mt-4">
                <button className="text-xs font-bold px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/20">
                  Read Cheatsheet
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}