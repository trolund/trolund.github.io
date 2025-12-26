'use client';

import React from 'react';
import { MenuItem } from '@/types/MenuItem';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ThemeIcon } from './theme-icon';
import { usePrefersReducedTransparency } from '@/hooks/usePrefersReducedTransparency';

export type MenuProps = {
  items: MenuItem[];
  spacing?: boolean;
  noBackground?: boolean;
};

const NavBar = ({ items, spacing, noBackground = false }: MenuProps) => {
  const pathname = usePathname();
  const reduceTransparency = usePrefersReducedTransparency();

  if (reduceTransparency) {
    noBackground = false;
  }

  return (
    <>
      {spacing && <div className="mb-5 h-16" />}
      <div className={cn('fixed top-0 z-40 w-full text-content-text')}>
        <div className="mx-auto flex h-[74px] max-w-6xl items-center justify-end px-3 md:justify-center">
          {/* Desktop Navigation */}
          <div
            className={cn(
              'hidden items-center gap-2 rounded-full px-2 py-2 md:flex',
              !noBackground &&
                (reduceTransparency
                  ? 'border border-border-color bg-[var(--bg)] shadow-custom'
                  : 'border border-border-color bg-bg-color shadow-custom backdrop-blur-[16px]'),
            )}
          >
            {items.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className={cn(
                  'relative rounded-full px-4 py-2 text-[0.82rem] font-semibold uppercase tracking-[0.3em] transition-all duration-200',
                  pathname === item.link
                    ? 'bg-content-text text-text'
                    : 'text-content-text/80 hover:bg-content-text/10 hover:text-content-text',
                )}
              >
                {item.itemName}
                {pathname === item.link && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-content-text/80" />
                )}
              </Link>
            ))}
            <button
              className="ml-1 inline-flex h-9 w-8 items-center justify-center rounded-full text-content-text/70 transition-all hover:bg-content-text/10 hover:text-content-text dark:hover:bg-content-text/10 dark:hover:text-text"
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="fixed bottom-1 left-1/2 z-50 w-[min(98vw,680px)] -translate-x-1/2 md:hidden">
        <div className="relative">
          <div
            className={cn(
              'flex items-center gap-2 rounded-full px-2 py-2',
              !noBackground &&
                (reduceTransparency
                  ? 'border border-border-color bg-[var(--bg)] shadow-custom'
                  : 'border border-border-color bg-bg-color shadow-custom backdrop-blur-[16px]'),
            )}
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}
          >
            <div className="grid flex-1 grid-cols-4 gap-1">
            {items.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className={cn(
                  'min-w-0 rounded-full px-2 py-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.12em] leading-tight transition-all',
                  pathname === item.link
                    ? 'bg-content-text text-text'
                    : 'text-content-text/70 hover:bg-content-text/10 hover:text-content-text',
                )}
              >
                <span className="block">{item.itemName}</span>
              </Link>
            ))}
          </div>
          </div>
          <button
            className={cn(
              'absolute -top-12 right-4 inline-flex h-11 w-11 min-w-0 items-center justify-center rounded-full border border-border-color bg-bg-color p-0 text-content-text shadow-custom transition-all hover:-translate-y-0.5 hover:bg-content-text/10 hover:text-content-text dark:hover:bg-content-text/10 dark:hover:text-text',
              !noBackground &&
                (reduceTransparency
                  ? 'bg-[var(--bg)]'
                  : 'bg-bg-color backdrop-blur-[16px]'),
            )}
            aria-label="Toggle theme"
          >
            <ThemeIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
