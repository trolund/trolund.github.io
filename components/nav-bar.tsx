import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { MenuItem } from "../types/MenuItem";
import useTheme from "../hooks/useTheme";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";

export interface MenuProps {
  items: MenuItem[];
}

const NavBar = ({ items }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, switchTheme } = useTheme();
  const router = useRouter();

  return (
    <>
      <div
        className={cn(
          "top-0 sticky z-40 w-full border-b-[1px] border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--content-text)] backdrop-blur-[10px]",
        )}
      >
        <div className="h-16 px-4 mx-auto flex max-w-5xl items-center justify-end">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex">
            {items.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className={cn(
                  "p-4 pt-5 m-2 cursor-pointer border-b-2 duration-300",
                  router.pathname === item.link
                    ? "border-b-4 border-[var(--content-text)] font-bold"
                    : "border-transparent hover:scale-105 hover:border-[var(--content-text)]",
                )}
              >
                <li>{item.itemName}</li>
              </Link>
            ))}
            <li
              onClick={switchTheme}
              className="p-4 m-2 cursor-pointer duration-300 hover:scale-125"
            >
              {isDark ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
            </li>
          </ul>

          {/* Mobile Navigation Icon */}
          <div onClick={() => setIsOpen(!isOpen)} className="block md:hidden">
            {isOpen ? (
              <AiOutlineClose size={20} />
            ) : (
              <AiOutlineMenu size={20} />
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      <ul
        className={cn(
          "fixed z-50 border-b-[1px] border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--content-text)] backdrop-blur-[10px]",
          isOpen
            ? "left-0 top-0 h-full w-[60%] duration-500 ease-in-out md:hidden"
            : "top-0 bottom-0 left-[-100%] w-[60%] duration-500 ease-in-out",
        )}
      >
        {/* Mobile Navigation Items */}
        {items.map((item) => (
          <li
            key={item.link}
            className="p-4 cursor-pointer border-b border-gray-600 text-[var(--content-text)] duration-300 hover:text-[var(--content-)]"
          >
            <Link
              href={item.link}
              className={
                router.pathname === item.link
                  ? "border-[var(--content-text)] font-bold"
                  : "border-transparent hover:scale-105 hover:border-[var(--content-text)]"
              }
            >
              {item.itemName}
            </Link>
          </li>
        ))}
        <li onClick={switchTheme} className="p-4 m-2 cursor-pointer">
          {isDark ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
        </li>
      </ul>
      {isOpen && (
        <div
          className="md:w-0 md:h-0 fixed z-[49] h-screen w-screen"
          onClick={() => setIsOpen(!isOpen)}
        ></div>
      )}
    </>
  );
};

export default NavBar;
