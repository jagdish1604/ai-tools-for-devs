import { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  FiFileText, FiDownload, FiUpload, FiCode, FiZap, 
  FiChevronRight, FiChevronDown, FiCopy, FiCheck, FiTrash2, FiMaximize2, FiAlertCircle, FiDatabase 
} from "react-icons/fi";

/* ---------------- SAFE TREE VIEW ---------------- */
function JsonNode({ data, label, isLast = true }) {
  const [open, setOpen] = useState(true);
  const isObject = typeof data === "object" && data !== null;

  const renderValue = (val) => {
    if (typeof val === "string") return <span className="text-emerald-500 font-mono">"{val}"</span>;
    if (typeof val === "number") return <span className="text-orange-500 font-mono">{val}</span>;
    if (typeof val === "boolean") return <span className="text-purple-500 font-mono">{String(val)}</span>;
    if (val === null) return <span className="text-slate-400 font-mono italic font-bold">null</span>;
    return String(val);
  };

  if (!isObject) {
    return (
      <div className="flex gap-2 text-sm py-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
        {label && <span className="text-sky-500 font-medium">"{label}":</span>}
        {renderValue(data)}
        {!isLast && <span className="text-slate-400">,</span>}
      </div>
    );
  }

  const entries = Object.entries(data);
  const isArray = Array.isArray(data);

  return (
    <div className="ml-2">
      <div 
        onClick={() => setOpen(!open)} 
        className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded px-1 transition-colors"
      >
        {open ? <FiChevronDown size={14} className="text-slate-400" /> : <FiChevronRight size={14} className="text-slate-400" />}
        {label && <span className="text-sky-500 font-medium">"{label}":</span>}
        <span className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">
          {isArray ? `Array [${entries.length}]` : `Object {${entries.length}}`}
        </span>
      </div>
      {open && (entries.length > 0) && (
        <div className="ml-4 border-l border-slate-200 dark:border-slate-800 pl-4 my-1">
          {entries.map(([key, value], i) => (
            <JsonNode key={key} label={isArray ? null : key} data={value} isLast={i === entries.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- MAIN TOOL ---------------- */
export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("tree"); 

  // ✅ THE GATEKEEPER: This prevents the "Blank Page" crash.
  // We parse the JSON here ONCE. If it fails, validData is null and the UI doesn't crash.
  const validData = useMemo(() => {
    if (!input.trim()) { setError(""); return null; }
    try {
      const parsed = JSON.parse(input);
      setError(""); 
      return parsed;
    } catch (e) {
      setError(e.message); 
      return null; 
    }
  }, [input]);

  // ✅ GENERATOR: TypeScript Interface
  const tsInterface = useMemo(() => {
    if (!validData) return "// Waiting for valid JSON...";
    let res = "interface GeneratedType {\n";
    Object.entries(validData).forEach(([k, v]) => {
      res += `  ${k}: ${Array.isArray(v) ? "any[]" : typeof v};\n`;
    });
    return res + "}";
  }, [validData]);

  // ✅ GENERATOR: JSON Schema
  const jsonSchema = useMemo(() => {
    if (!validData) return "// Waiting for valid JSON...";
    const generate = (v) => {
      const type = Array.isArray(v) ? "array" : typeof v;
      if (type === "object" && v !== null) {
        const properties = {};
        Object.entries(v).forEach(([k, val]) => properties[k] = generate(val));
        return { type: "object", properties };
      }
      return { type: type === "number" ? "integer" : type };
    };
    return JSON.stringify({ $schema: "http://json-schema.org/draft-07/schema#", ...generate(validData) }, null, 2);
  }, [validData]);

  const handleAction = (type) => {
    if (!validData) return;
    const result = type === "format" ? JSON.stringify(validData, null, 2) : JSON.stringify(validData);
    setOutput(result);
    setActiveTab("raw"); // Switch to see the output
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (f) => setInput(f.target.result);
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-slate-100">
      <Helmet><title>JSON Master | Formatter & Schema</title></Helmet>

      {/* NAVBAR */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
              <FiMaximize2 className="rotate-45 text-indigo-600" />
            </Link>
            <h1 className="font-black text-xl tracking-tighter italic uppercase text-slate-900 dark:text-white">
              JSON<span className="text-indigo-600 font-normal">MASTER</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer px-4 py-2 text-[10px] font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg">
              <FiUpload /> IMPORT FILE <input type="file" className="hidden" onChange={handleImport} />
            </label>
            <button onClick={() => setInput("")} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 /></button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* EDITOR SECTION */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2"><FiFileText /> Editor</span>
              <div className={`px-2 py-1 rounded text-[10px] font-bold ${error ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-emerald-500 text-white'}`}>
                {error ? 'INVALID INPUT' : 'SYNTAX OK'}
              </div>
            </div>
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`w-full h-[600px] p-6 bg-white dark:bg-slate-900 border-2 rounded-[2rem] font-mono text-sm outline-none transition-all shadow-xl ${error ? 'border-red-500/30' : 'border-transparent dark:border-slate-800 focus:border-indigo-500'}`}
                placeholder='Paste raw JSON here...'
              />
              {error && (
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-red-600 text-white rounded-2xl text-xs font-bold flex items-center gap-3 shadow-2xl animate-pulse">
                  <FiAlertCircle size={18} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          {/* OUTPUT SECTION */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl w-fit">
              {['tree', 'raw', 'types', 'schema'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="w-full h-[600px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
              <div className="flex-1 overflow-auto p-8">
                {activeTab === 'tree' && (
                  validData ? <JsonNode data={validData} /> : <div className="text-slate-400 text-xs text-center mt-20 italic">Correct the syntax error to enable tree view.</div>
                )}
                {activeTab === 'raw' && <pre className="text-sm text-emerald-500 font-mono whitespace-pre-wrap">{output || "// Press Beautify or Minify to see results"}</pre>}
                {activeTab === 'types' && <pre className="text-sm text-sky-500 font-mono whitespace-pre-wrap">{tsInterface}</pre>}
                {activeTab === 'schema' && <pre className="text-sm text-orange-500 font-mono whitespace-pre-wrap">{jsonSchema}</pre>}
              </div>

              {/* ACTION BAR */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                <button 
                  onClick={() => handleAction('format')} 
                  disabled={!validData} 
                  className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 text-white rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-indigo-200"
                >
                  Beautify
                </button>
                <button 
                  onClick={() => handleAction('minify')} 
                  disabled={!validData} 
                  className="flex-1 py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 rounded-2xl font-bold text-sm disabled:opacity-30 transition-all uppercase"
                >
                  Minify
                </button>
                <button 
                  onClick={() => {
                    const content = activeTab === 'types' ? tsInterface : activeTab === 'schema' ? jsonSchema : (output || input);
                    navigator.clipboard.writeText(content);
                    setCopied(true); setTimeout(() => setCopied(false), 2000);
                  }} 
                  className="px-6 py-4 bg-emerald-500 text-white rounded-2xl transition-all shadow-lg"
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                </button>
              </div>
            </div>
          </div>

        </div>
        
      </main>
      {/* 📘 EDUCATIONAL & FAQ SECTION (SEO BOOST) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20 mt-12">
        <div className="grid md:grid-cols-2 gap-12 border-t border-slate-200 dark:border-slate-800 pt-12">
          
          {/* Left Column: Why & How */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Professional JSON Management
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              JSON (JavaScript Object Notation) is the backbone of modern web communication. 
              However, raw API responses are often minified and impossible to debug. 
              <strong> JSON Master</strong> provides a high-performance environment to 
              validate, format, and visualize your data structures instantly.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 shrink-0"><FiZap /></div>
                <div>
                  <h3 className="font-bold text-sm">Instant Validation</h3>
                  <p className="text-xs text-slate-500">Real-time syntax checking with descriptive error messages for broken JSON.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0"><FiDatabase /></div>
                <div>
                  <h3 className="font-bold text-sm">Tree Visualization</h3>
                  <p className="text-xs text-slate-500">Navigate complex nested objects and arrays with a collapsible interactive tree view.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: FAQs */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FiCheck className="text-indigo-600" /> Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  q: "Is my data safe with JSON Master?",
                  a: "Yes. Our tool is client-side only. Your JSON data never leaves your browser and is not sent to any server, ensuring 100% privacy."
                },
                {
                  q: "Can I convert JSON to TypeScript?",
                  a: "Absolutely! Simply paste your JSON and switch to the 'Types' tab to get automatically generated TypeScript interfaces."
                },
                {
                  q: "Why is my JSON showing as 'Invalid'?",
                  a: "The most common reasons are missing quotes around keys, trailing commas, or unclosed brackets. Our editor will highlight the exact syntax error for you."
                },
                {
                  q: "Does this tool support JSON Schema?",
                  a: "Yes, it automatically generates a draft-07 JSON Schema based on the structure of your input data."
                }
              ].map((faq, i) => (
                <details key={i} className="group bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-4 cursor-pointer transition-all border border-transparent hover:border-indigo-500/30">
                  <summary className="font-bold text-sm flex justify-between items-center list-none">
                    {faq.q}
                    <FiChevronDown className="group-open:rotate-180 transition-transform text-slate-400" />
                  </summary>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}