'use client';

import { Themes } from '@/types/theme';
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export function ThemeIcon() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false);
    const size = 25;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    if (!theme) return null;

    return (theme === "dark" ? <MdDarkMode size={size} onClick={() => setTheme(Themes.LIGHT)} />
        : <MdLightMode size={size} onClick={() => setTheme(Themes.DARK)} />);
}
