"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
  isClient: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    // Initialize theme from localStorage
    const saved = localStorage.getItem("theme") as Theme;
    if (saved) {
      setThemeState(saved);
    }

    const updateTheme = () => {
      const newResolvedTheme = theme;

      setResolvedTheme(newResolvedTheme);
      
      // Apply theme to document
      if (newResolvedTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }

      // Update CSS custom properties for theme switching
      const root = document.documentElement;
      if (newResolvedTheme === "dark") {
        root.style.setProperty('--bg-primary', '#0f172a');
        root.style.setProperty('--bg-secondary', '#1e293b');
        root.style.setProperty('--bg-tertiary', '#334155');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#e2e8f0');
        root.style.setProperty('--text-tertiary', '#94a3b8');
        root.style.setProperty('--border-color', '#374151');
      } else {
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f8fafc');
        root.style.setProperty('--bg-tertiary', '#f1f5f9');
        root.style.setProperty('--text-primary', '#000000');
        root.style.setProperty('--text-secondary', '#374151');
        root.style.setProperty('--text-tertiary', '#6b7280');
        root.style.setProperty('--border-color', '#e5e7eb');
      }
    };

    updateTheme();

    // Set isClient to true after all client-side setup is complete
    setIsClient(true);

    return () => {};
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, isClient }}>
      {children}
    </ThemeContext.Provider>
  );
}
