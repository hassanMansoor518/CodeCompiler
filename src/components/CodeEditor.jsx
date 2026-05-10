import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";
import { Play, Download, Zap, ZapOff, FileCode, FileJson, FileType } from "lucide-react";

export default function CodeEditor({ theme, code, updateCode, onRun }) {
  const { html, css, js } = code;
  const [activeTab, setActiveTab] = useState("html");
  const [autoRun, setAutoRun] = useState(true);

  useEffect(() => {
    if (autoRun) {
      const timeout = setTimeout(() => {
        onRun({ html, css, js });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [html, css, js, autoRun, onRun]);

  const handleRun = () => onRun({ html, css, js });

  const handleDownload = () => {
    const combinedCode = `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>${js}<\/script>
</body>
</html>`;
    const blob = new Blob([combinedCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: "html", label: "HTML", icon: <FileCode size={16} />, color: "text-orange-500" },
    { id: "css", label: "CSS", icon: <FileType size={16} />, color: "text-blue-500" },
    { id: "javascript", label: "JS", icon: <FileJson size={16} />, color: "text-yellow-500" },
  ];

  return (
    <div className={`flex flex-col h-full ${theme === "dark" ? "bg-[#1e1e1e]" : "bg-white"}`}>
      <div className={`flex flex-wrap md:flex-nowrap items-center justify-between px-2 md:px-4 py-2 border-b gap-2 ${
        theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-gray-50 border-gray-200"
      }`}>
        <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 text-xs md:text-sm font-medium transition-all relative whitespace-nowrap ${
                activeTab === tab.id
                  ? theme === "dark" ? "text-white" : "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className={tab.color}>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <button
            onClick={() => setAutoRun(!autoRun)}
            title={autoRun ? "Auto-run Enabled" : "Auto-run Disabled"}
            className={`p-1.5 md:p-2 rounded-md transition-colors ${
              autoRun 
                ? "text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20" 
                : "text-gray-500 bg-gray-500/10 hover:bg-gray-500/20"
            }`}
          >
            {autoRun ? <Zap size={16} className="md:w-[18px] md:h-[18px]" /> : <ZapOff size={16} className="md:w-[18px] md:h-[18px]" />}
          </button>
          
          <button
            onClick={handleDownload}
            title="Download code"
            className={`p-1.5 md:p-2 rounded-md transition-colors ${
              theme === "dark" ? "text-gray-400 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Download size={16} className="md:w-[18px] md:h-[18px]" />
          </button>

          {!autoRun && (
            <button
              onClick={handleRun}
              className="flex items-center gap-1 md:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 md:px-4 md:py-1.5 rounded-md text-xs md:text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
            >
              <Play size={12} className="md:w-[14px] md:h-[14px]" fill="currentColor" />
              <span className="hidden sm:inline">Run</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={activeTab === "javascript" ? "javascript" : activeTab}
          value={activeTab === "html" ? html : activeTab === "css" ? css : js}
          onChange={(val) => {
            if (activeTab === "html") updateCode({ html: val });
            else if (activeTab === "css") updateCode({ css: val });
            else updateCode({ js: val });
          }}
          theme={theme === "dark" ? "vs-dark" : "vs-light"}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            fontFamily: "Fira Code, monospace",
          }}
        />
      </div>
    </div>
  );
}


