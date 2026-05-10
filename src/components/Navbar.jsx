import React from "react";
import { Sun, Moon, Code2, Menu } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";

function Navbar({ toggleSidebar }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <nav
      className={`flex justify-between items-center px-4 md:px-8 py-4 border-b transition-all duration-500 sticky top-0 z-50 ${
        theme === "dark"
          ? "bg-gray-900/80 border-gray-800 backdrop-blur-md text-white"
          : "bg-white/80 border-gray-200 backdrop-blur-md text-gray-900"
      }`}
    >
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="p-2 md:hidden rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg shadow-lg shadow-blue-500/20">
          <Code2 size={24} className="text-white" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight hidden sm:block">
          Code<span className="text-blue-600">Compiler</span>
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full transition-all duration-300 border ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 hover:bg-gray-700 text-yellow-400"
              : "bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-600"
          }`}
        >
          {theme === "dark" ? (
            <>
              <Sun size={18} />
              <span className="text-sm font-medium text-gray-200 hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon size={18} />
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Dark</span>
            </>
          )}
        </button>
        
        <div className="h-8 w-[1px] bg-gray-700/20 mx-1 md:mx-2"></div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
            JS
          </div>
          <span className="hidden lg:inline text-sm font-medium">Guest User</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


