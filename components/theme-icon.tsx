'use client';

import { useState, useEffect } from 'react';
import { Themes } from '@/types/theme';
import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode, MdAutoMode as SystemIcon } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import * as Cronitor from '@cronitorio/cronitor-rum';

const themes = Object.values(Themes) as Themes[];

export function ThemeIcon() {
  const { theme, setTheme } = useTheme();
  const size = 25;

  // Only render on client
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // mark mounted asynchronously to avoid synchronous setState warning
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme as Themes | undefined;

  const getNextTheme = (current: Themes | undefined) => {
    // Find the current index; default to -1 if not found
    const currentIndex = current ? themes.indexOf(current) : -1;

    // Compute the next index, wrapping around
    const nextIndex = (currentIndex + 1) % themes.length;

    // Handle case where currentIndex was -1 (current theme not in array)
    const selectedTheme = nextIndex >= 0 ? themes[nextIndex] : themes[0];

    console.log('Switching theme:', {
      from: current,
      fromIndex: currentIndex,
      to: selectedTheme,
      toIndex: nextIndex,
    });

    Cronitor.track('ThemeChange', { message: selectedTheme });

    return selectedTheme;
  };

  const getIcon = () => {
    switch (currentTheme) {
      case Themes.DARK:
        return <MdDarkMode size={size} />;
      case Themes.LIGHT:
        return <MdLightMode size={size} />;
      case Themes.SYSTEM:
      default:
        return <SystemIcon size={size} />;
    }
  };

  // Safe to render because we are on client
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={currentTheme}
        onClick={() => setTheme(getNextTheme(currentTheme))}
        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
        transition={{ duration: 0.3 }}
        className="cursor-pointer"
      >
        {getIcon()}
      </motion.div>
    </AnimatePresence>
  );
}
