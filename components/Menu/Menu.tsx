import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { SiLinkedin } from 'react-icons/si';
import { VscGithubInverted } from 'react-icons/vsc';
import styles from "./Menu.module.css";
import { MenuItem } from './MenuItem';

export interface MenuProps {
    items: MenuItem[],
    spacing?: boolean,
    disableScroll?: boolean
}

enum ResponsiveMode {
    DESKTOP = 0,
    MOBILE = 1
}

enum MenuState {
    INIT = 0,
    SHOW = 1,
    HIDE = 2
}

const breakpoint = 600;

function Menu({ items, disableScroll, spacing }: MenuProps) {

    const key = "isDark"

    const [menuState, setMenuState] = useState(ResponsiveMode.DESKTOP)
    const [SideMenuState, setSideMenuState] = useState(MenuState.INIT)
    const [showbg, setShowbg] = useState(false)
    const [isDark, setIsDark] = useState(false)

    const router = useRouter()

    const scrollControl = useCallback(() => {
        if (window.scrollY > 5 || disableScroll) {
            setShowbg(true)
        } else {
            setShowbg(false)
        }
    }, [setShowbg, disableScroll]);

    useEffect(() => {
        state()
        if (disableScroll) {
            setShowbg(true)
        }
        window.addEventListener('resize', state, false)
        window.addEventListener('scroll', scrollControl, false)
        return () => {
            window.removeEventListener('resize', state, false)
            window.removeEventListener('scroll', scrollControl, false)
        }
    }, [disableScroll, scrollControl]);

    useEffect(() => {
        let isDark = localStorage.getItem(key) === 'true'
        setIsDark(isDark)

    }, []);


    useEffect(() => {
        updateColors(isDark)
        window.dispatchEvent(new CustomEvent("setIsDarkStorage", { detail: isDark } as object));
    }, [isDark]);

    const state = () => {
        if (window.innerWidth < breakpoint) {
            setMenuState(ResponsiveMode.MOBILE)
        } else {
            setMenuState(ResponsiveMode.DESKTOP)
        }
    }

    const toggleMenu = () => {
        if (menuState === ResponsiveMode.MOBILE) {
            SideMenuState === MenuState.SHOW ? setSideMenuState(MenuState.HIDE) : setSideMenuState(MenuState.SHOW)
        } else {
            setSideMenuState(MenuState.SHOW)
        }
    }

    const getMenuClass = (state: MenuState, reponsiveMode: ResponsiveMode, showbg: boolean) => {
        if (state === MenuState.HIDE) {
            if (reponsiveMode === ResponsiveMode.DESKTOP) {
                return styles.hidedesktop + " shadow-sm";
            } else {
                return styles.hide + " " + styles.menubg + " shadow-sm";
            }
        }
        else if (state === MenuState.SHOW) {
            if (reponsiveMode === ResponsiveMode.DESKTOP) {
                return + "shadow-sm " + (showbg ? styles.showdesktop + " " + styles.menubg : styles.showdesktop);
            } else {
                return styles.show + " " + styles.menubg + " shadow-sm";
            }
        }
        else {
            if (reponsiveMode === ResponsiveMode.DESKTOP) {
                if (showbg || (disableScroll && state != MenuState.INIT)) {
                    return styles.showdesktop + " " + styles.menubg + " shadow-sm " + "her2";
                }
                return styles.showdesktop;
            } else {
                return styles.init;
            }
        }

    }

    const switchTheme = (e) => {
        let newValue = !isDark;
        setIsDark(newValue)
        window.dispatchEvent(new CustomEvent("isDarkStorage", { detail: newValue } as object));
    }

    const updateColors = (isDark: boolean) => {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        localStorage.setItem(key, String(isDark));
    }

    return <>
        {menuState === ResponsiveMode.MOBILE &&
            <button title='menu-button' className={(SideMenuState == MenuState.SHOW ? "is-active " : "") + "hamburger hamburger--collapse " + styles.menuButton} type="button" onClick={toggleMenu}>
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
            </button>}
        {menuState !== ResponsiveMode.DESKTOP && <div onClick={() => setSideMenuState(MenuState.HIDE)} style={{ left: "var(--menu-width)", height: "100vh", width: "calc(100vw - var(--menu-width))", position: "fixed", zIndex: 99999, top: 0 }} />}
        <div className={styles.menu + " " + getMenuClass(SideMenuState, menuState, showbg)}>
            <div style={{ maxWidth: "1024px" }} className={styles.menuContainer + " container"}>
                <ul>
                    {items?.map(i => <Link key={i.link} href={i.link} legacyBehavior><li key={i.link} className={router.pathname == i.link ? styles.active : ""} style={i.styles}>{i.itemName}</li></Link>)}
                    <div className={styles.icons}>
                        <a href="https://github.com/trolund">
                            <VscGithubInverted size={30} style={{ animationDelay: "0.2s" }} />
                        </a>
                        <a href="https://www.linkedin.com/in/trolund/">
                            <SiLinkedin size={30} style={{ animationDelay: "0.5s" }} />
                        </a>
                        <div onClick={switchTheme} style={{ display: "inline", float: "right", cursor: "pointer" }}>
                            {isDark ? <MdDarkMode size={30} /> : <MdOutlineDarkMode size={30} />}
                        </div>
                    </div>
                </ul>

            </div>
        </div>
        {spacing && <div style={{ height: "calc(var(--menu-height) + 20px)" }}></div>}
    </>;
};

export default Menu;
