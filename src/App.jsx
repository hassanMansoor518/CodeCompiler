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
    css: "h1 { color: red; text-align:center; }",
    js: "console.log('Hi');",
  });

  return (
    <div
      className={`h-screen flex flex-col transition-all duration-700 ease-in-out ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 flex-grow transition-all duration-700">
        {/* Sidebar */}
        <div
          className={`overflow-y-auto border-r ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-300"
          }`}
        >
          <Sidebar theme={theme} />
        </div>

        {/* Code Editor */}
        <div
          className={`border-r ${
            theme === "dark"
              ? "bg-gray-900 border-gray-700"
              : "bg-gray-50 border-gray-300"
          }`}
        >
          <CodeEditor theme={theme} onRun={setCode} />
        </div>

        {/* Preview */}
        <div className={`${theme === "dark" ? "bg-gray-950" : "bg-white"}`}>
          <Preview code={code} theme={theme} />
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
