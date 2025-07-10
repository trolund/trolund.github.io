'use client';

import { Themes } from '@/types/theme';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode, MdAutoMode as SystemIcon } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import * as Cronitor from '@cronitorio/cronitor-rum';

const themes = Object.values(Themes) as Themes[];

export function ThemeIcon() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const size = 25;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ width: size, height: size + 6 }} />;

  const getNextTheme = (current: string | undefined) => {
    const index = themes.indexOf(current as Themes);
    const selectedTheme = themes[(index + 1) % themes.length];

    Cronitor.track('ThemeChange', {
      message: selectedTheme,
    });

    return selectedTheme;
  };

  const getIcon = () => {
    switch (theme) {
      case Themes.DARK:
        return <MdDarkMode size={size} />;
      case Themes.LIGHT:
        return <MdLightMode size={size} />;
      case Themes.SYSTEM:
      default:
        return <SystemIcon size={size} />;
    }
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={theme}
        onClick={() => setTheme(getNextTheme(theme))}
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
