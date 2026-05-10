import React, { useState } from "react";
import { BookOpen, ChevronRight, ChevronDown, Sparkles, Code, Layout, Palette } from "lucide-react";

const tutorialSections = [
  {
    id: "basics",
    title: "HTML Basics",
    icon: <Layout size={18} />,
    content: "Start with a simple structure. Use semantic tags for better SEO.",
    snippets: [
      { 
        name: "Welcome Card", 
        html: "<div class='card'>\n  <h2>Welcome to CodeCompiler</h2>\n  <p>Start your coding journey here!</p>\n</div>", 
        css: ".card { padding: 20px; border-radius: 12px; background: #f3f4f6; border: 1px solid #e5e7eb; transition: all 0.3s; }\n.card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }",
        js: "console.log('Welcome loaded!');"
      }
    ]
  },
  {
    id: "css",
    title: "CSS Magic",
    icon: <Palette size={18} />,
    content: "Learn how to style your elements using modern CSS techniques.",
    snippets: [
      { 
        name: "Neon Button", 
        html: "<button class='neon-btn'>Hover Me</button>", 
        css: ".neon-btn { padding: 12px 24px; border-radius: 8px; background: #000; color: #fff; border: 2px solid #3b82f6; cursor: pointer; transition: 0.3s; }\n.neon-btn:hover { box-shadow: 0 0 15px #3b82f6; border-color: #60a5fa; }",
        js: "document.querySelector('.neon-btn').onclick = () => alert('Neon Glow!');"
      }
    ]
  },
  {
    id: "js",
    title: "JS Interaction",
    icon: <Code size={18} />,
    content: "Make your web pages interactive with JavaScript.",
    snippets: [
      { 
        name: "Click Counter", 
        html: "<h1 id='counter'>0</h1>\n<button id='inc'>Increment</button>", 
        css: "h1 { font-size: 3rem; margin: 0; }\nbutton { padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; }",
        js: "let count = 0;\ndocument.getElementById('inc').onclick = () => {\n  count++;\n  document.getElementById('counter').innerText = count;\n};"
      }
    ]
  }
];

function Sidebar({ theme, updateCode }) {
  const [openSection, setOpenSection] = useState("basics");

  return (
    <div className={`h-full flex flex-col ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
      <div className={`p-6 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="text-blue-500" size={20} />
          <h2 className="text-lg font-bold">Learning Hub</h2>
        </div>
        <p className="text-xs opacity-70">Pick a snippet to start experimenting.</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tutorialSections.map((section) => (
          <div key={section.id} className={`border-b ${theme === "dark" ? "border-gray-800/50" : "border-gray-100"}`}>
            <button
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                openSection === section.id 
                  ? theme === "dark" ? "bg-gray-800/30" : "bg-blue-50/50" 
                  : "hover:bg-gray-800/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={openSection === section.id ? "text-blue-500" : "text-gray-500"}>
                  {section.icon}
                </span>
                <span className={`text-sm font-semibold ${openSection === section.id ? "text-blue-500" : ""}`}>
                  {section.title}
                </span>
              </div>
              {openSection === section.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {openSection === section.id && (
              <div className="p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-xs leading-relaxed">{section.content}</p>
                
                <div className="space-y-2">
                  {section.snippets.map((snippet, idx) => (
                    <button
                      key={idx}
                      onClick={() => updateCode({ html: snippet.html, css: snippet.css, js: snippet.js })}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all group ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 hover:border-blue-500 hover:bg-gray-700"
                          : "bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                      }`}
                    >
                      <span className="text-xs font-medium">{snippet.name}</span>
                      <Sparkles size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={`p-4 text-center border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
        <p className="text-[10px] uppercase tracking-wider font-bold opacity-50">Happy Coding!</p>
      </div>
    </div>
  );
}

export default Sidebar;

