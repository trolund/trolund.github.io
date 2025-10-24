'use client';

import { useState, useEffect } from 'react';
import { Themes } from '@/types/theme';
import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode, MdAutoMode as SystemIcon, MdAdjust } from 'react-icons/md';
import { motion } from 'framer-motion';
import * as Cronitor from '@cronitorio/cronitor-rum';

const themes = Object.values(Themes) as Themes[];

export function ThemeIcon() {
  const { theme, setTheme } = useTheme();
  const size = 25;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return <div style={{ width: size, height: size }} />;

  const currentTheme = theme as Themes ?? Themes.SYSTEM;

  const getNextTheme = (current: Themes) => {
    const currentIndex = current ? themes.indexOf(current) : -1;
    const nextIndex = (currentIndex + 1) % themes.length;
    const selectedTheme = nextIndex >= 0 ? themes[nextIndex] : themes[0];

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
        return <SystemIcon size={size} />
      default:
        return <MdAdjust size={size} />;
    }
  };

  return (
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
  );
}
