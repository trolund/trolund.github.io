'use client';

import { Themes } from '@/types/theme';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaCircle } from "react-icons/fa6";
import { AnimatePresence, motion } from 'framer-motion';
import { th } from 'date-fns/locale';


export function ThemeIcon() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const size = 25;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{width: size, height: size}} />;

  const isDark = (theme) => {
    if(theme === undefined || theme === 'system') return false;
    return theme === Themes.DARK;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={theme}
        onClick={() => setTheme(isDark(theme) ? Themes.LIGHT : Themes.DARK)}
        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'inline-block', cursor: 'pointer' }}
      >
        {isDark(theme) ? <MdDarkMode size={size} /> : <MdLightMode size={size} />}
      </motion.div>
    </AnimatePresence>
  );
}
