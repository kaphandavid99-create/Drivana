"use client";

import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, isClient } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    if (theme === "light") return <Sun size={16} />;
    return <Moon size={16} />;
  };

  const getLabel = () => {
    if (theme === "light") return "Light Mode";
    return "Dark Mode";
  };

  // Don't render until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <button
        className="relative p-2 sm:p-2.5 rounded-full text-sky-500 hover:text-sky-600 hover:bg-muted/50 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
        disabled
      >
        <div className="w-4 h-4"></div>
      </button>
    );
  }

  return (
    <button
      onClick={cycleTheme}
      className="relative p-2 sm:p-2.5 rounded-full text-sky-500 hover:text-sky-600 hover:bg-muted/50 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center group"
      title={getLabel()}
      aria-label={`Current theme: ${getLabel()}`}
    >
      <div className="relative">
        {getIcon()}
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
        {getLabel()}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </button>
  );
}
