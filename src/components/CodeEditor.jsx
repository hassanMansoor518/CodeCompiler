import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";

export default function CodeEditor({ onRun }) {
  const theme = useSelector((state) => state.theme.theme);
  const [html, setHtml] = useState("<h1>Hello World</h1>");
  const [css, setCss] = useState("h1 { color: black; padding: 10px; }");
  const [js, setJs] = useState("console.log('Hello from JS');");
  const [language, setLanguage] = useState("html");

  const handleRun = () => onRun({ html, css, js });
  const getEditorValue = () =>
    language === "html" ? html : language === "css" ? css : js;

  const handleChange = (value) => {
    if (language === "html") setHtml(value);
    if (language === "css") setCss(value);
    if (language === "javascript") setJs(value);
  };

  return (
    <div
      className={`flex flex-col h-full ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`flex items-center justify-between p-3 border-b ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-200 border-gray-300"
        }`}
      >
        <div className="flex items-center space-x-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`px-2 py-1 rounded focus:outline-none ${
              theme === "dark"
                ? "bg-gray-700 text-gray-300"
                : "bg-white text-gray-800 border border-gray-300"
            }`}
          >
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
          </select>
          <span className="text-sm text-gray-500 capitalize">
            {language} Editor
          </span>
        </div>

        <button
          onClick={handleRun}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md transition"
        >
          Run ▶
        </button>
      </div>

      <Editor
        height="83vh"
        language={language}
        value={getEditorValue()}
        onChange={handleChange}
        theme={theme === "dark" ? "vs-dark" : "vs-light"}
      />
    </div>
  );
}
