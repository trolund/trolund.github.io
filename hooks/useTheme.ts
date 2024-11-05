import { useState, useEffect } from 'react';

const useTheme = () => {
  const [isDark, setIsDark] = useState(false);
  const key = 'isDark';

  // Retrieve theme from localStorage and apply it on initial render
  useEffect(() => {
    const storedIsDark = localStorage.getItem(key) === 'true';
    setIsDark(storedIsDark);
    updateColors(storedIsDark);
  }, []);

  // Toggle the theme and update localStorage
  const switchTheme = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    updateColors(newValue);
  };

  // Update the data-theme attribute on the document and localStorage
  const updateColors = (isDarkMode: boolean) => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    localStorage.setItem(key, String(isDarkMode));
  };

  return { isDark, switchTheme };
};

export default useTheme;
