import React from "react";
import { Sun, Moon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";

function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <nav
      className={`flex justify-between items-center px-6 py-3 border-b transition-all duration-700 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-gray-200 border-gray-300"
      }`}
    >
      <h1
        className={`text-xl font-bold ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        Code Compiler
      </h1>

      <button
        onClick={() => dispatch(toggleTheme())}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-500"
      >
        {theme === "dark" ? (
          <>
            <Sun size={18} />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon size={18} />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    </nav>
  );
}

export default Navbar;
