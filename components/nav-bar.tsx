import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { MenuItem } from '../types/MenuItem';
import { useRouter } from 'next/router';
import transStyles from '../styles/view-trans.module.css';
import Link from 'next/link';
import { useTheme } from '../hooks/ThemeContext';
import { cn } from '../lib/utils';

export type MenuProps = {
  items: MenuItem[];
  spacing?: boolean;
  noBackground?: boolean;
};

const NavBar = ({ items, spacing, noBackground = false }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, switchTheme } = useTheme();
  const router = useRouter();

  return (
    <>
      {spacing && <div className="mb-5 h-16" />}
      <div
        className={cn(
          'fixed top-0 z-40 w-full text-content-text',
          transStyles.nav,
          !noBackground && 'border-b-[1px] border-border-color bg-bg-color shadow-custom backdrop-blur-[10px]'
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
                  router.pathname === item.link
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
            <li onClick={switchTheme} className="cursor-pointer p-7 duration-300 hover:scale-125">
              {isDark ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
            </li>
          </ul>

          {/* Mobile Navigation Icon */}
          <div onClick={() => setIsOpen(!isOpen)} className="block p-5 md:hidden">
            {isOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      <ul
        className={cn(
          'fixed z-50 border-r-[1px] border-border-color bg-bg-color text-content-text backdrop-blur-[10px]',
          isOpen
            ? 'left-0 top-0 h-full w-[60%] duration-500 ease-in-out md:hidden'
            : 'bottom-0 left-[-100%] top-0 w-[60%] duration-500 ease-in-out',
        )}
      >
        {/* Mobile Navigation Items */}
        {items.map((item) => (
          <li
            key={item.link}
            className="cursor-pointer border-b border-border-color p-4 text-content-text duration-300 hover:bg-slate-300/30 dark:hover:bg-gray-800/30"
          >
            <Link
              href={item.link}
              className={
                router.pathname === item.link
                  ? 'border-content-text font-bold'
                  : 'border-transparent hover:scale-105 hover:border-content-text'
              }
            >
              {item.itemName}
            </Link>
          </li>
        ))}
        <li onClick={switchTheme} className="m-2 cursor-pointer p-4">
          {isDark ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
        </li>
      </ul>
      {isOpen && (
        <div
          className="fixed z-[49] h-screen w-screen md:h-0 md:w-0"
          onClick={() => setIsOpen(!isOpen)}
        ></div>
      )}
    </>
  );
};

export default NavBar;
