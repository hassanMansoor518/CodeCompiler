import React, { useEffect, useRef, useState } from "react";
import { Monitor, Terminal, Trash2, Maximize2, Minimize2 } from "lucide-react";

export default function Preview({ code, theme }) {
  const iframeRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [showConsole, setShowConsole] = useState(true);

  useEffect(() => {
    const { html, css, js } = code;

    const documentContent = `
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: ${theme === "dark" ? "#020617" : "white"};
              color: ${theme === "dark" ? "white" : "black"};
              margin: 20px;
              line-height: 1.5;
            }
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script>
            (function() {
              const sendLog = (type, msg) => {
                window.parent.postMessage({ type, msg }, "*");
              };

              console.log = function(...args) {
                sendLog("log", args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(" "));
              };
              console.error = function(...args) {
                sendLog("error", args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(" "));
              };
              window.onerror = function(msg) {
                sendLog("error", msg);
              };

              try { ${js} } catch (err) {
                sendLog("error", err.message || err);
              }
            })();
          </script>
        </body>
      </html>
    `;

    iframeRef.current.srcdoc = documentContent;

    const handleMessage = (event) => {
      if (event.data?.type && event.data?.msg) {
        setLogs((prev) => [...prev, { type: event.data.type, msg: event.data.msg }]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [code, theme]);

  return (
    <div className={`flex flex-col h-full overflow-hidden ${theme === "dark" ? "bg-[#020617]" : "bg-white"}`}>
      {/* Header */}
      <div
        className={`flex justify-between items-center px-4 py-2 border-b ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800 text-white"
            : "bg-gray-50 border-gray-200 text-gray-800"
        }`}
      >
        <div className="flex items-center gap-2">
          <Monitor size={16} className="text-blue-500" />
          <span className="text-xs font-bold uppercase tracking-wider">Live Preview</span>
        </div>
        <button
          onClick={() => setShowConsole(!showConsole)}
          className={`flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full transition-all border ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
              : "bg-white border-gray-300 hover:bg-gray-100 text-gray-600"
          }`}
        >
          <Terminal size={14} />
          {showConsole ? "Close Console" : "Open Console"}
        </button>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-white">
        <iframe
          ref={iframeRef}
          title="preview"
          className="w-full h-full border-none"
          sandbox="allow-scripts"
        ></iframe>
      </div>

      {/* Console Area */}
      {showConsole && (
        <div
          className={`h-32 md:h-48 flex flex-col border-t transition-all duration-300 ${
            theme === "dark" ? "bg-gray-950 border-gray-800" : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className={`flex items-center justify-between px-3 md:px-4 py-1.5 border-b text-[10px] font-bold uppercase tracking-widest ${
            theme === "dark" ? "bg-gray-900/50 border-gray-800 text-gray-500" : "bg-gray-100 border-gray-200 text-gray-400"
          }`}>
            <span className="flex items-center gap-1 md:gap-2">
              <Terminal size={10} />
              Console
            </span>
            <button 
              onClick={() => setLogs([])}
              className="hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <Trash2 size={10} />
              Clear
            </button>
          </div>
          
          <div className="flex-1 p-2 md:p-3 overflow-y-auto font-mono text-xs space-y-1">
            {logs.length === 0 && (
              <div className="text-gray-500 italic opacity-50 flex flex-col items-center justify-center h-full gap-2">
                <Terminal size={24} className="opacity-20" />
                <span>No logs to display</span>
              </div>
            )}
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`flex gap-2 md:gap-3 py-1 border-b last:border-0 ${
                  theme === "dark" ? "border-gray-800/50" : "border-gray-200"
                }`}
              >
                <span className={`shrink-0 w-2 h-2 rounded-full mt-1 ${
                  log.type === "error" ? "bg-red-500" : "bg-green-500"
                }`} />
                <pre className={`whitespace-pre-wrap break-all ${
                  log.type === "error" ? "text-red-400" : theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  {log.msg}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

