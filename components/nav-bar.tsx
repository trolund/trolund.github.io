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

type NavLinkProps = {
  item: MenuItem;
  isActive: boolean;
  mobile?: boolean;
};

function NavLink({ item, isActive, mobile = false }: NavLinkProps) {
  return (
    <LinkTransition
      href={item.link}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'nav-pill relative rounded-full font-semibold uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-white/25 dark:focus-visible:ring-offset-zinc-950',
        mobile
          ? 'min-w-0 px-2 py-2 text-center text-[0.65rem] leading-tight tracking-[0.12em]'
          : 'px-4 py-2 text-[0.82rem] tracking-[0.3em]',
        isActive
          ? 'bg-content-text text-text'
          : 'hover:bg-content-text/15 text-content-text opacity-80 hover:text-content-text hover:opacity-100',
      )}
    >
      {mobile ? <span className="block">{item.itemName}</span> : item.itemName}
      {isActive && !mobile && (
        <span
          className="bg-content-text/80 absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
          aria-hidden="true"
        />
      )}
    </LinkTransition>
  );
}

const NavBar = ({ items, spacing, noBackground = false }: MenuProps) => {
  const pathname = usePathname();
  const reduceTransparency = usePrefersReducedTransparency();
  const { theme, setTheme } = useTheme();
  const [isMobileHidden, setIsMobileHidden] = useState(false);
  const [animateThemeIcon, setAnimateThemeIcon] = useState(false);
  const lastScrollY = useRef(0);
  const scrollRaf = useRef<number | null>(null);
  const shouldUseSolidShell = reduceTransparency || noBackground;

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
    setAnimateThemeIcon(true);
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
          <nav
            aria-label="Primary"
            className={cn(
              'nav-shell hidden items-center gap-2 rounded-full px-2 py-2 backdrop-blur-md md:flex',
              !noBackground && 'border border-border-color shadow-custom',
              shouldUseSolidShell && 'nav-shell-solid',
            )}
            onMouseMove={handleGlowMove}
          >
            {items.map((item) => (
              <NavLink key={item.link} item={item} isActive={pathname === item.link} />
            ))}
            <button
              type="button"
              className="ml-1 inline-flex h-9 w-9 min-w-0 items-center justify-center rounded-full p-0 text-content-text opacity-70 transition-colors duration-200 hover:bg-black/20 hover:text-content-text hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-white/25 dark:focus-visible:ring-offset-zinc-950"
              aria-label="Toggle theme"
              onClick={handleThemeToggle}
            >
              <ThemeIcon
                theme={currentTheme}
                animateOnChange={animateThemeIcon}
                onAnimationComplete={() => setAnimateThemeIcon(false)}
              />
            </button>
          </nav>
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
              paddingBottom: 'env(safe-area-inset-bottom)',
            } as React.CSSProperties
          }
        >
          <nav
            aria-label="Primary mobile"
            className={cn(
              'nav-shell nav-blur flex items-center gap-2 rounded-full px-2 py-2',
              'border border-border-color shadow-custom',
              shouldUseSolidShell && 'nav-shell-solid',
            )}
            style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
            onMouseMove={handleGlowMove}
          >
            <div className="grid flex-1 grid-cols-4 gap-1">
              {items.map((item) => (
                <NavLink
                  key={item.link}
                  item={item}
                  isActive={pathname === item.link}
                  mobile={true}
                />
              ))}
            </div>
          </nav>
          <button
            type="button"
            className={cn(
              'absolute -top-12 right-4 inline-flex h-11 w-11 min-w-0 items-center justify-center rounded-full border border-border-color bg-bg-color p-0 text-content-text shadow-custom transition-[transform,background-color,color] duration-200 hover:-translate-y-0.5 hover:bg-black/20 hover:text-content-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-white/25 dark:focus-visible:ring-offset-zinc-950',
              !noBackground &&
                (reduceTransparency ? 'bg-bg-color backdrop-blur-md' : 'bg-[var(--bg)]'),
            )}
            aria-label="Toggle theme"
            onClick={handleThemeToggle}
          >
            <ThemeIcon
              theme={currentTheme}
              animateOnChange={animateThemeIcon}
              onAnimationComplete={() => setAnimateThemeIcon(false)}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
