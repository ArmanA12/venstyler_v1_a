import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, then default to system
    const savedTheme = localStorage.getItem('fashionconnect_theme') as Theme;
    return savedTheme || 'system';
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Function to get system theme preference
    const getSystemTheme = (): 'light' | 'dark' => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Function to update actual theme
    const updateActualTheme = () => {
      let newActualTheme: 'light' | 'dark';
      
      if (theme === 'system') {
        newActualTheme = getSystemTheme();
      } else {
        newActualTheme = theme;
      }

      setActualTheme(newActualTheme);
      // Apply theme to document
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(newActualTheme);
    };

    // Update theme immediately
    updateActualTheme();

    // Listen for system theme changes if theme is set to 'system'
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateActualTheme();
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('fashionconnect_theme', newTheme);
  };

  const value: ThemeContextType = {
    theme,
    setTheme: handleSetTheme,
    actualTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
