'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MenuItem } from '@/types/MenuItem';
import { usePathname } from 'next/navigation';
import LinkTransition from './link-transition';
import { cn } from '@/lib/utils';
import { ThemeIcon } from './theme-icon';
import { usePrefersReducedTransparency } from '@/hooks/usePrefersReducedTransparency';
import { useTheme } from 'next-themes';
import { Themes } from '@/types/theme';
import * as Cronitor from '@cronitorio/cronitor-rum';

export type MenuProps = {
  items: MenuItem[];
  spacing?: boolean;
  noBackground?: boolean;
};

const NavBar = ({ items, spacing, noBackground = false }: MenuProps) => {
  const pathname = usePathname();
  const reduceTransparency = usePrefersReducedTransparency();
  const { theme, setTheme } = useTheme();
  const [isMobileHidden, setIsMobileHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollRaf = useRef<number | null>(null);

  if (reduceTransparency) {
    noBackground = false;
  }

  const themes = Object.values(Themes) as Themes[];
  const currentTheme = (theme as Themes) ?? Themes.SYSTEM;
  const getNextTheme = (current: Themes) => {
    const currentIndex = current ? themes.indexOf(current) : -1;
    const nextIndex = (currentIndex + 1) % themes.length;
    return nextIndex >= 0 ? themes[nextIndex] : themes[0];
  };
  const handleThemeToggle = () => {
    const next = getNextTheme(currentTheme);
    Cronitor.track('ThemeChange', { message: next });
    setTheme(next);
  };

  const handleGlowMove = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    target.style.setProperty('--nav-glow-x', `${x}%`);
    target.style.setProperty('--nav-glow-y', `${y}%`);
  };

  useEffect(() => {
    const onScroll = () => {
      if (scrollRaf.current !== null) return;
      scrollRaf.current = window.requestAnimationFrame(() => {
        scrollRaf.current = null;
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;
        if (Math.abs(delta) > 6) {
          setIsMobileHidden(delta > 0 && currentY > 80);
          lastScrollY.current = currentY;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (scrollRaf.current !== null) cancelAnimationFrame(scrollRaf.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {spacing && <div className="mb-5 hidden h-16 md:block" />}
      <div className={cn('fixed top-0 z-40 w-full text-content-text')}>
        <div className="mx-auto flex h-[74px] max-w-6xl items-center justify-end px-3 md:justify-center">
          {/* Desktop Navigation */}
          <div
            className={cn(
              'nav-shell hidden items-center gap-2 rounded-full px-2 py-2 backdrop-blur-md md:flex',
              !noBackground && 'border border-border-color shadow-custom',
            )}
            style={{ viewTransitionName: 'nav-bar' } as React.CSSProperties}
            onMouseMove={handleGlowMove}
          >
            {items.map((item) => (
              <LinkTransition
                key={item.link}
                href={item.link}
                className={cn(
                  'nav-pill relative rounded-full px-4 py-2 text-[0.82rem] font-semibold uppercase tracking-[0.3em] transition-all duration-200',
                  pathname === item.link
                    ? 'bg-content-text text-text'
                    : 'hover:bg-content-text/15 text-content-text opacity-80 hover:text-content-text hover:opacity-100',
                )}
              >
                {item.itemName}
                {pathname === item.link && (
                  <span
                    className="bg-content-text/80 absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </LinkTransition>
            ))}
            <button
              className="ml-1 inline-flex h-9 w-9 min-w-0 items-center justify-center rounded-full p-0 text-content-text opacity-70 transition-all hover:bg-black/20 hover:text-content-text hover:opacity-100"
              aria-label="Toggle theme"
              onClick={handleThemeToggle}
            >
              <ThemeIcon theme={currentTheme} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div
        className={cn(
          'fixed bottom-4 left-0 right-0 z-50 mx-auto w-[min(98vw,680px)] md:hidden',
          isMobileHidden ? 'pointer-events-none' : '',
        )}
      >
        <div
          className="relative rounded-full backdrop-blur-md transition-transform duration-300"
          style={
            {
              transform: isMobileHidden ? 'translateY(calc(100% + 8rem))' : 'translateY(0)',
              viewTransitionName: 'nav-bar',
              paddingBottom: 'env(safe-area-inset-bottom)',
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              'nav-shell nav-blur flex items-center gap-2 rounded-full px-2 py-2',
              'border border-border-color shadow-custom',
            )}
            style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
            onMouseMove={handleGlowMove}
          >
            <div className="grid flex-1 grid-cols-4 gap-1">
              {items.map((item) => (
                <LinkTransition
                  key={item.link}
                  href={item.link}
                  className={cn(
                    'nav-pill min-w-0 rounded-full px-2 py-2 text-center text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.12em] transition-all',
                    pathname === item.link
                      ? 'bg-content-text text-text'
                      : 'hover:bg-content-text/15 text-content-text opacity-70 hover:text-content-text hover:opacity-100',
                  )}
                >
                  <span className="block">{item.itemName}</span>
                </LinkTransition>
              ))}
            </div>
          </div>
          <button
            className={cn(
              'absolute -top-12 right-4 inline-flex h-11 w-11 min-w-0 items-center justify-center rounded-full border border-border-color bg-bg-color p-0 text-content-text shadow-custom transition-all hover:-translate-y-0.5 hover:bg-black/20 hover:text-content-text',
              !noBackground &&
                (reduceTransparency ? 'bg-bg-color backdrop-blur-md' : 'bg-[var(--bg)]'),
            )}
            aria-label="Toggle theme"
            onClick={handleThemeToggle}
          >
            <ThemeIcon theme={currentTheme} />
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
