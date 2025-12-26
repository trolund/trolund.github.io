'use client';

import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
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
  const [isOpen, setIsOpen] = useState(false);
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
                  <span className="bg-content-text/80 absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full" />
                )}
              </Link>
            ))}
            <button
              className="text-content-text/70 hover:bg-content-text/10 ml-1 inline-flex h-9 w-8 items-center justify-center rounded-full transition-all hover:text-content-text dark:hover:bg-content-text dark:hover:text-text"
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </button>
          </div>

          {/* Mobile Navigation Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'text-content-text/80 hover:bg-content-text/10 inline-flex h-11 w-10 items-center justify-center rounded-full transition-all hover:text-content-text dark:text-content-text dark:hover:bg-white/20 dark:hover:text-text md:hidden',
              !noBackground &&
                (reduceTransparency
                  ? 'border border-border-color bg-[var(--bg)] shadow-custom'
                  : 'border border-border-color bg-bg-color shadow-custom backdrop-blur-[16px]'),
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={cn(
          'fixed z-50 border-r border-border-color bg-bg-color text-content-text shadow-custom backdrop-blur-[16px]',
          isOpen
            ? 'left-0 top-0 h-full w-[60%] duration-500 ease-in-out md:hidden'
            : '-left-full bottom-0 top-0 w-[60%] duration-500 ease-in-out',
        )}
      >
        <li className="text-content-text/60 px-4 pb-2 pt-6 text-xs uppercase tracking-[0.35em]">
          Menu
        </li>
        {items.map((item) => (
          <li
            key={item.link}
            className="cursor-pointer border-b border-border-color px-4 py-3 text-content-text duration-300 hover:bg-slate-300/30 dark:hover:bg-gray-800/30"
          >
            <Link
              href={item.link}
              className={cn(
                'block w-full text-sm font-semibold uppercase tracking-[0.2em]',
                pathname === item.link ? 'text-content-text' : 'text-content-text/70',
              )}
              onClick={() => setIsOpen(false)} // Optional: close menu after click
            >
              {item.itemName}
            </Link>
          </li>
        ))}
        <li className="text-content-text/70 m-3 inline-flex cursor-pointer items-center gap-3 rounded-full border border-border-color px-4 py-2 text-xs uppercase tracking-[0.2em]">
          <ThemeIcon />
          Theme
        </li>
      </ul>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="z-49 fixed h-screen w-screen bg-black/30 backdrop-blur-[2px] md:h-0 md:w-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar;
