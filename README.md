CodeCompiler
A browser-based code editor for writing, running, and previewing HTML, CSS, and JavaScript — no setup, no installs.
🔗 Live Demo: code-compiler-o6kh.vercel.app

Features

Three-panel editor — Separate tabs for HTML, CSS, and JS with syntax highlighting
Live Preview — Renders output instantly in an iframe as you write
Built-in Console — Captures and displays JavaScript console output in real time
Learning Hub — Curated code snippets across HTML Basics, CSS Magic, and JS Interaction to get started fast
Dark Mode — Toggle between light and dark themes
Code Download — Export your code directly from the editor
Guest Access — No login required to start coding


Tech Stack

React — UI components and state management
Vite — Fast dev server and build tooling
JavaScript — Core runtime, iframe sandbox for code execution
CSS — Custom styling with theme support
Vercel — Deployment


Getting Started
bash# Clone the repo
git clone https://github.com/hassanMansoor518/CodeCompiler.git
cd CodeCompiler

# Install dependencies
npm install

# Start the dev server
npm run dev
Open http://localhost:5173 in your browser.

How It Works
HTML, CSS, and JS are written in their respective editor tabs. On run, the three are combined and injected into a sandboxed iframe for live rendering. JavaScript console.log output is captured and shown in the built-in console panel below the preview.

Project Structure
CodeCompiler/
├── public/
├── src/
│   ├── components/    # Editor, Preview, Console, LearningHub
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── vite.config.js

Roadmap

 Resizable editor and preview panes
 Save and share code via URL
 Additional language support
 User accounts and project history


License
MIT
