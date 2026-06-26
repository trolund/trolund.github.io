'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MenuItem } from '@/types/MenuItem';
import { usePathname } from 'next/navigation';
import LinkTransition from './link-transition';
import { cn } from '@/lib/utils';
import { usePrefersReducedTransparency } from '@/hooks/usePrefersReducedTransparency';
import { useTheme } from 'next-themes';
import { Themes } from '@/types/theme';
import { trackCronitorEvent } from '@/hooks/useCronitor';
import { MdLightMode, MdDarkMode, MdAutoMode, MdCheck } from 'react-icons/md';

type MenuProps = {
  items: MenuItem[];
  spacing?: boolean;
  noBackground?: boolean;
};

type NavLinkProps = {
  item: MenuItem;
  isActive: boolean;
  mobile?: boolean;
};

const THEME_OPTIONS = [
  { value: Themes.LIGHT, Icon: MdLightMode, label: 'Light' },
  { value: Themes.SYSTEM, Icon: MdAutoMode, label: 'System' },
  { value: Themes.DARK, Icon: MdDarkMode, label: 'Dark' },
] as const;

function ThemeIcon({ theme, size }: { theme: Themes; size: number }) {
  const opt = THEME_OPTIONS.find((o) => o.value === theme) ?? THEME_OPTIONS[1];
  return <opt.Icon size={size} />;
}

// -------------------------------------------------------------------
// ThemeDropdown — a compact trigger button + floating dropdown panel
// placement='bottom' for desktop (nav is at the top)
// placement='top'    for mobile  (nav is at the bottom)
// -------------------------------------------------------------------
type ThemeDropdownProps = {
  theme: Themes;
  onSelect: (t: Themes) => void;
  placement?: 'top' | 'bottom';
  triggerClassName?: string;
};

function ThemeDropdown({
  theme,
  onSelect,
  placement = 'bottom',
  triggerClassName,
}: ThemeDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const panelBase =
    'absolute right-0 z-50 min-w-[148px] overflow-hidden rounded-xl border border-border-color bg-[var(--bg)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-150 dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]';

  const panelPosition = placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-3';

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Theme"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex min-w-0 items-center justify-center rounded-full border-0 bg-black/[0.06] p-0 text-content-text transition-colors duration-150 hover:bg-black/[0.11] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] dark:focus-visible:ring-white/20',
          triggerClassName,
        )}
      >
        <ThemeIcon theme={theme} size={18} />
      </button>

      {/* Dropdown panel */}
      <div
        role="listbox"
        aria-label="Theme"
        className={cn(
          panelBase,
          panelPosition,
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : placement === 'top'
              ? 'pointer-events-none translate-y-1 opacity-0'
              : 'pointer-events-none -translate-y-1 opacity-0',
        )}
      >
        <div className="flex flex-col gap-0.5 p-1">
          {THEME_OPTIONS.map(({ value, Icon, label }) => {
            const isActive = theme === value;
            return (
              <button
                key={value}
                role="option"
                aria-selected={isActive}
                type="button"
                onClick={() => {
                  if (!isActive) {
                    void trackCronitorEvent('ThemeChange', { message: value });
                    onSelect(value);
                  }
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg border border-transparent bg-transparent px-2.5 py-2 text-sm transition-colors duration-100',
                  isActive
                    ? 'bg-black/[0.06] font-semibold text-black dark:bg-white/[0.12] dark:text-white'
                    : 'font-medium text-black/50 hover:border-black/[0.07] hover:bg-black/[0.05] hover:text-black dark:text-white/50 dark:hover:border-white/[0.08] dark:hover:bg-white/[0.08] dark:hover:text-white',
                )}
              >
                <Icon size={16} />
                <span className="flex-1 text-left">{label}</span>
                {isActive && (
                  <MdCheck size={14} className="shrink-0 text-black/40 dark:text-white/50" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------

function NavLink({ item, isActive, mobile = false }: NavLinkProps) {
  return (
    <span className={cn('relative', mobile && 'block')}>
      <LinkTransition
        href={item.link}
        aria-current={isActive ? 'page' : undefined}
        style={
          isActive ? { viewTransitionName: mobile ? 'nav-active-mobile' : 'nav-active' } : undefined
        }
        className={cn(
          'nav-pill relative rounded-full font-semibold uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-white/25 dark:focus-visible:ring-offset-zinc-950',
          mobile
            ? 'block w-full px-2 py-2 text-center text-[0.65rem] leading-tight tracking-[0.12em]'
            : 'inline-flex h-9 min-w-[7rem] items-center justify-center text-[0.82rem] tracking-[0.12em]',
          isActive
            ? 'bg-content-text text-text'
            : 'hover:bg-content-text/15 text-content-text opacity-80 hover:text-content-text hover:opacity-100',
        )}
      >
        {item.itemName}
      </LinkTransition>
      {isActive && !mobile && (
        <span
          className="bg-content-text/80 absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
          aria-hidden="true"
        />
      )}
    </span>
  );
}

// -------------------------------------------------------------------

const NavBar = ({ items, spacing, noBackground = false }: MenuProps) => {
  const pathname = usePathname();
  const reduceTransparency = usePrefersReducedTransparency();
  const { theme, setTheme } = useTheme();
  const [isMobileHidden, setIsMobileHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollRaf = useRef<number | null>(null);
  const shouldUseSolidShell = reduceTransparency || noBackground;
  const currentTheme = (theme as Themes) ?? Themes.SYSTEM;

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

      {/* Desktop nav */}
      <div className="fixed top-0 z-40 w-full text-content-text">
        <div className="mx-auto flex h-[74px] max-w-6xl items-center justify-end px-3 md:justify-center">
          <nav
            aria-label="Primary"
            style={{ viewTransitionName: 'site-nav' }}
            className={cn(
              'nav-shell hidden items-center gap-1.5 rounded-full px-2 py-2 md:flex',
              !noBackground && 'border border-border-color shadow-custom',
              shouldUseSolidShell && 'nav-shell-solid',
            )}
            onMouseMove={handleGlowMove}
          >
            {items.map((item) => (
              <NavLink key={item.link} item={item} isActive={pathname === item.link} />
            ))}
            <span className="bg-content-text/15 mx-0.5 h-4 w-px rounded-full" aria-hidden="true" />
            <ThemeDropdown
              theme={currentTheme}
              onSelect={setTheme}
              placement="bottom"
              triggerClassName="h-9 w-9"
            />
          </nav>
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <div
        style={
          {
            bottom: isMobileHidden ? 'calc(-6rem - env(safe-area-inset-bottom))' : '1rem',
            paddingBottom: 'env(safe-area-inset-bottom)',
          } as React.CSSProperties
        }
        className={cn(
          'fixed left-0 right-0 z-50 mx-auto w-[min(98vw,680px)] transition-[bottom] duration-300 md:hidden',
          isMobileHidden ? 'pointer-events-none' : '',
        )}
      >
        <div className="relative rounded-full">
          {/* Floating theme dropdown above mobile nav */}
          <div className="absolute -top-14 right-3">
            <ThemeDropdown
              theme={currentTheme}
              onSelect={setTheme}
              placement="top"
              triggerClassName="h-11 w-11 rounded-full border border-border-color bg-[var(--bg)] shadow-custom hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"
            />
          </div>

          <nav
            aria-label="Primary mobile"
            style={{ viewTransitionName: 'site-nav-mobile' } as React.CSSProperties}
            className={cn(
              'nav-shell flex items-center gap-2 rounded-full px-2 py-2',
              'border border-border-color shadow-custom',
              shouldUseSolidShell && 'nav-shell-solid',
            )}
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
        </div>
      </div>
    </>
  );
};

export default NavBar;
