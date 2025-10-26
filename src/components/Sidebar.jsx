import React from "react";

function Sidebar({ theme }) {
  return (
    <div
      className={`h-full overflow-y-auto ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {/* Section 1 */}
      <div className="p-4 border-b border-gray-600">
        <h2 className="text-lg font-bold mb-3">Understanding the Modulo Operator</h2>
        <p className="text-sm mb-4">
          The modulo operator (%) returns the remainder after dividing one number by another.
        </p>

        <pre
          className={`p-3 rounded text-sm ${
            theme === "dark"
              ? "bg-gray-900"
              : "bg-gray-100 border border-gray-300"
          }`}
        >
{`const what = 10 % 4; // 2
const the = 10 % 10; // 0
const heck = 4 % 10; // 4`}
        </pre>

        <p className="mt-4 text-sm">
          Try editing the HTML, CSS, and JavaScript in the editor to see changes live!
        </p>
      </div>

      {/* Section 2 */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-3">More Practice with Modulo</h2>
        <p className="text-sm mb-4">
          The modulo operator helps in cyclic patterns, like clocks or array rotations.
        </p>

        <pre
          className={`p-3 rounded text-sm ${
            theme === "dark"
              ? "bg-gray-900"
              : "bg-gray-100 border border-gray-300"
          }`}
        >
{`for (let i = 1; i <= 12; i++) {
  console.log((i % 12) + 1);
}`}
        </pre>

        <p className="mt-4 text-sm">
          Try changing numbers above to understand how modulo works in cycles.
        </p>

        <p className="mt-4 text-sm">
          This is especially useful for animations, games, and looping logic.
        </p>

        <p className="mt-4 text-sm">
          Keep experimenting and watch your code update live!
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
