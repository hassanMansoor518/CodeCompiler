import React, { useEffect, useRef, useState } from "react";

export default function Preview({ code, theme }) {
  const iframeRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    const { html, css, js } = code;

    const documentContent = `
      <html>
        <head>
          <style>
            body {
              font-family: sans-serif;
              background-color: ${theme === "dark" ? "#0f172a" : "white"};
              color: ${theme === "dark" ? "white" : "black"};
              margin: 10px;
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
                sendLog("log", args.join(" "));
              };
              console.error = function(...args) {
                sendLog("error", args.join(" "));
              };
              window.onerror = function(msg) {
                sendLog("error", msg);
              };

              try { ${js} } catch (err) {
                sendLog("error", err);
              }
            })();
          </script>
        </body>
      </html>
    `;

    setLogs([]);
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
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className={`flex justify-between items-center p-3 text-sm font-semibold uppercase border-b ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-gray-200 border-gray-300 text-gray-800"
        }`}
      >
        <span>Live Preview</span>
        <button
          onClick={() => setShowConsole(!showConsole)}
          className={`px-3 py-1 text-xs font-medium rounded ${
            theme === "dark"
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-300 hover:bg-gray-400 text-black"
          }`}
        >
          {showConsole ? "Hide Console" : "Show Console"}
        </button>
      </div>

      {/* Preview */}
      <iframe
        ref={iframeRef}
        title="preview"
        className="w-full flex-1 border-none"
        sandbox="allow-scripts"
      ></iframe>

      {/* Console */}
      {showConsole && (
        <div
          className={`h-40 p-2 overflow-auto border-t ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
          }`}
        >
          {logs.length === 0 && <div className="text-gray-500">Console is empty</div>}
          {logs.map((log, idx) => (
            <pre
              key={idx}
              className={`whitespace-pre-wrap ${
                log.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {log.msg}
            </pre>
          ))}
        </div>
      )}
    </div>
  );
}
