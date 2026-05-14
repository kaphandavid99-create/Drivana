"use client";

import { useTheme } from '../app/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, isClient } = useTheme();

  if (!isClient) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse"></div>
    );
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    if (theme === "light") {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    }
  };

  const getLabel = () => {
    if (theme === "light") return "Light";
    return "Dark";
  };

  const getBgColor = () => {
    if (resolvedTheme === "light") return "!bg-sky-500 hover:!bg-white !text-white hover:!text-sky-500 border-sky-500 hover:border-white";
    return "!bg-gray-800 hover:!bg-gray-700 !text-gray-200 border-gray-700";
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-200 ${getBgColor()}`}
      title={`Current theme: ${getLabel()}. Click to cycle: Light → Dark`}
    >
      {getIcon()}
    </button>
  );
}
