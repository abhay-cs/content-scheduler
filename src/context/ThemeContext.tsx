// context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkModeState] = useState(true); // Default to dark mode

  // Load theme preference from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkModeState(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkModeState(prefersDark);
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    // You could also add/remove CSS classes to the document element here if needed
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkModeState(prev => !prev);
  };

  const value = {
    darkMode,
    toggleDarkMode,
    setDarkMode: setDarkModeState,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}