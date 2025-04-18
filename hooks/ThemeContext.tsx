import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as Cronitor from '@cronitorio/cronitor-rum';

type ThemeContextType = {
  isDark: boolean;
  switchTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState(false);
  const key = 'isDark';

  useEffect(() => {
    const storedIsDark = localStorage.getItem(key) === 'true';
    setIsDark(storedIsDark);
    applyTheme(storedIsDark);
  }, []);

  const switchTheme = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    applyTheme(newValue);
  };

  const applyTheme = (isDarkMode: boolean) => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem(key, String(isDarkMode));
    Cronitor.track('ThemeChange', {
      message: isDarkMode ? 'dark' : 'light',
    });
  };

  return <ThemeContext.Provider value={{ isDark, switchTheme }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };
