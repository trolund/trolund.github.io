'use client';

import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { MenuItem } from '@/types/MenuItem';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ThemeIcon } from './theme-icon';
import { usePrefersReducedTransparency } from '@/hooks/usePrefersReducedTransparency';
import { motion, AnimatePresence } from "framer-motion";
import { useScrollPosition } from '@/hooks/useScrollPosition';

export type MenuProps = {
  items: MenuItem[];
  spacing?: boolean;
  noBackground?: boolean;
};

const NavBar = ({ items, spacing, noBackground = false }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const reduceTransparency = usePrefersReducedTransparency();
  const scrollY = useScrollPosition();

  if (reduceTransparency || scrollY > 50) {
    noBackground = false;
  }

  return (
    <>
      {spacing && <div className="mb-5 h-16" />}
      <div
        className={cn(
          'fixed top-0 z-40 w-full text-content-text transition-all duration-300 ease-in-out',
          !noBackground &&
          'border-b-[1px] border-border-color bg-bg-color shadow-custom backdrop-blur-[10px]',
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-5xl items-center justify-end px-2">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex md:gap-2">
            {items.map((item) => (
              <li
                key={item.link}
                className={cn(
                  'group relative mb-2 mt-2 block cursor-pointer border-b-[1px] duration-300 hover:border-content-text',
                  pathname === item.link
                    ? 'border-b-4 border-content-text font-bold'
                    : 'border-transparent',
                )}
              >
                <Link
                  className="block h-full w-full p-5 pt-5 transition-all duration-300 group-hover:scale-105 group-hover:bg-slate-300/30 dark:group-hover:bg-gray-800/30"
                  href={item.link}
                >
                  {item.itemName}
                </Link>
              </li>
            ))}
            <li className="cursor-pointer p-7 duration-300 hover:scale-125">
              <ThemeIcon />
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={cn(
          'fixed top-0 z-50 border-r-[1px] border-border-color bg-bg-color text-content-text text-center backdrop-blur-[10px]',
          isOpen
            ? 'translate-y-0 left-0 w-full duration-500 ease-in-out md:hidden'
            : '-translate-y-full left-0 w-full duration-500 ease-in-out md:hidden'
        )}
      >
        <li className="m-2 cursor-pointer p-4 w-fit">
          <ThemeIcon />
        </li>
        {items.map((item) => (
          <li
            key={item.link}
            className="cursor-pointer border-b border-border-color p-4 text-content-text duration-300 hover:bg-slate-300/30 dark:hover:bg-gray-800/30"
          >
            <Link
              href={item.link}
              className={cn(
                'block w-full',
                pathname === item.link
                  ? 'border-content-text font-bold'
                  : 'border-transparent hover:scale-105 hover:border-content-text',
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.itemName}
            </Link>
          </li>
        ))}

      </ul>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed z-[49] h-screen w-screen md:h-0 md:w-0"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Icon */}
      <div className='fixed top-1 right-0 z-50 w-fit md:hidden'>
        <div onClick={() => setIsOpen(!isOpen)} className="block p-5 md:hidden z-50">

          <motion.div>
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <AiOutlineClose size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <AiOutlineMenu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
