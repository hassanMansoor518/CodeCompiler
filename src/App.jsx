// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import Chatbot from "./components/Chatbot";
import { useSelector } from "react-redux";

export default function App() {
  const theme = useSelector((state) => state.theme.theme);

  const [code, setCode] = useState({
    html: "<h1>Write, edit and run HTML, CSS and JavaScript code online.</h1>",
    css: "h1 { color: #3b82f6; text-align: center; font-family: sans-serif; transition: all 0.5s; }\nh1:hover { transform: scale(1.1); color: #6366f1; }",
    js: "console.log('Welcome to CodeCompiler! 🚀');",
  });

  const [displayCode, setDisplayCode] = useState(code);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const updateCode = (newCode) => {
    setCode((prev) => ({ ...prev, ...newCode }));
  };

  return (
    <div
      className={`h-screen flex flex-col transition-all duration-500 ease-in-out ${
        theme === "dark" ? "bg-[#0f172a] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Drawer on mobile, fixed width on desktop */}
        <div
          className={`absolute md:relative z-40 h-full w-80 overflow-y-auto border-r transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } ${
            theme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
          }`}
        >
          <Sidebar theme={theme} updateCode={updateCode} />
        </div>

        {/* Editor and Preview Split */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden w-full">
          {/* Code Editor */}
          <div
            className={`flex-1 md:w-1/2 border-b md:border-b-0 md:border-r transition-all duration-500 ${
              theme === "dark"
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-200"
            }`}
          >
            <CodeEditor 
              theme={theme} 
              code={code} 
              updateCode={updateCode} 
              onRun={setDisplayCode} 
            />
          </div>

          {/* Preview */}
          <div className={`flex-1 md:w-1/2 transition-all duration-500 ${
            theme === "dark" ? "bg-[#020617]" : "bg-white"
          }`}>
            <Preview code={displayCode} theme={theme} />
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}



