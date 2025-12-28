'use client';

import { useEffect, useState } from 'react';
import { Themes } from '@/types/theme';
import { MdDarkMode, MdLightMode, MdAutoMode as SystemIcon, MdAdjust } from 'react-icons/md';
import { motion } from 'framer-motion';

type ThemeIconProps = {
  theme: Themes;
  size?: number;
};

export function ThemeIcon({ theme, size = 25 }: ThemeIconProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return <div style={{ width: size, height: size }} />;

  const getIcon = () => {
    switch (theme) {
      case Themes.DARK:
        return <MdDarkMode size={size} />;
      case Themes.LIGHT:
        return <MdLightMode size={size} />;
      case Themes.SYSTEM:
        return <SystemIcon size={size} />;
      default:
        return <MdAdjust size={size} />;
    }
  };

  return (
    <motion.div
      key={theme}
      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
      transition={{ duration: 0.3 }}
    >
      {getIcon()}
    </motion.div>
  );
}
