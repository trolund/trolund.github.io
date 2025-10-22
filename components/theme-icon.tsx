'use client';

import { useState, useEffect } from 'react';
import { Themes } from '@/types/theme';
import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode, MdAutoMode as SystemIcon } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import * as Cronitor from '@cronitorio/cronitor-rum';

const themes = Object.values(Themes) as Themes[];

export function ThemeIcon() {
  const { resolvedTheme, setTheme } = useTheme();
  const size = 25;

  // Only render on client
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // mark mounted asynchronously to avoid synchronous setState warning
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme as Themes | undefined;

  const getNextTheme = (current: Themes | undefined) => {
    const index = themes.indexOf(current ?? Themes.SYSTEM);
    const selectedTheme = themes[(index + 1) % themes.length];

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
