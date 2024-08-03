import React, { useRef } from 'react'
import styles from './big-banner.module.css'
import Text from '../text/text'
import { motion, useTransform, useScroll } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import ParticalBanner from '../partical-banner'
import { isMobile } from 'react-device-detect'
import Link from 'next/link'
import useScreenSize from '../../hooks/useScreenSize'

export interface OneProps { }

function BigBanner2({ }: OneProps) {

    const constraintsRef = useRef(null)
    const { width, height } = useScreenSize();

    const { scrollYProgress } = useScroll()

    const generateCircles = (rows, cols, radius, spacing, fill, defaultOpacity, specialCircle) => {
        const circles = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cx = j * spacing;
                const cy = i * spacing;
                const isSpecial = specialCircle && specialCircle.cx === cx && specialCircle.cy === cy;
                const opacity = isSpecial ? specialCircle.opacity : defaultOpacity;

                circles.push(
                    <circle
                        key={`${i}-${j}`}
                        r={radius}
                        cx={cx}
                        cy={cy}
                        fill={fill}
                        stroke="none"
                        opacity={opacity}
                    />
                );
            }
        }
        return circles;
    };

    const rows = (height / 200) * 5;
    const cols = (width / 200) * 2;
    const radius = 15;
    const spacing = width / (cols - 1);
    const fill = "hsla(269, 89%, 42%, 1.00)";
    const defaultOpacity = 0.35;
    const specialCircle = { cx: spacing * 1, cy: spacing * 2, opacity: 1.00 };

    return <>
        <svg width="100vw" height="100vh" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={styles.background} opacity="1">
            <defs>
                <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                    <stop id="stop1" stop-color="rgba(248, 117, 55, 1)" offset="0%"></stop>
                    <stop id="stop2" stop-color="rgba(251, 168, 31, 1)" offset="100%"></stop>
                </linearGradient>
            </defs>
            <g transform="translate(50, 50)">
                <path className={styles.rotate2} fill="url(#sw-gradient)" d="M23,-28.9C29.3,-22.1,33.6,-14.4,34.6,-6.5C35.6,1.5,33.3,9.7,29.7,18.3C26.1,26.9,21.3,36,13.8,39.3C6.4,42.6,-3.6,40.1,-12.3,36C-21,31.9,-28.3,26.2,-31.6,19C-34.9,11.7,-34.2,2.9,-33.6,-6.8C-32.9,-16.5,-32.3,-27.1,-26.7,-34C-21.1,-40.9,-10.5,-44.1,-1.1,-42.8C8.3,-41.5,16.7,-35.7,23,-28.9Z" stroke-width="0"></path>
                <path className={styles.rotate} fill="url(#sw-gradient)" d="M28.1,-32.7C36.1,-26.9,42,-17.6,43.7,-7.7C45.4,2.2,42.9,12.8,37.6,21.6C32.4,30.4,24.3,37.5,15.4,39.4C6.6,41.4,-3.1,38.2,-12.6,34.7C-22.1,31.2,-31.4,27.3,-37.1,20.1C-42.8,12.9,-44.9,2.3,-42.5,-6.9C-40.1,-16,-33.3,-23.8,-25.5,-29.7C-17.7,-35.6,-8.8,-39.7,0.6,-40.4C10.1,-41.2,20.2,-38.6,28.1,-32.7Z" stroke-width="0"></path>
                <path className={styles.rotate3} fill="url(#sw-gradient)" d="M22.7,-28C28.3,-22.2,31.3,-14.1,33,-5.6C34.8,2.9,35.5,11.9,32.6,20.5C29.7,29.2,23.1,37.4,14.6,40.7C6.2,44,-4.3,42.3,-13.8,38.6C-23.2,34.8,-31.6,28.9,-37.3,20.7C-43,12.5,-46.1,1.9,-44.6,-8.2C-43.2,-18.3,-37.3,-27.9,-29.2,-33.2C-21,-38.5,-10.5,-39.5,-1,-38.3C8.5,-37.1,17,-33.7,22.7,-28Z" stroke-width="0"></path>
                <path className={styles.rotate} fill="url(#sw-gradient)" d="M18.7,-24C23.9,-17.9,27.6,-11.7,28.3,-5.3C29.1,1,26.8,7.6,23.7,14.2C20.5,20.8,16.4,27.3,9.7,32.3C2.9,37.2,-6.5,40.6,-14.9,38.6C-23.2,36.5,-30.4,29.1,-34.2,20.7C-38,12.2,-38.4,2.7,-34.5,-3.8C-30.6,-10.3,-22.6,-13.8,-16.1,-19.7C-9.7,-25.6,-4.8,-33.9,0.9,-35C6.7,-36.2,13.4,-30.1,18.7,-24Z" stroke-width="0"></path>
                <path className={styles.rotate4} style={{ opacity: 0.3 }} fill="url(#sw-gradient)" d="M18.7,-24C23.9,-17.9,27.6,-11.7,28.3,-5.3C29.1,1,26.8,7.6,23.7,14.2C20.5,20.8,16.4,27.3,9.7,32.3C2.9,37.2,-6.5,40.6,-14.9,38.6C-23.2,36.5,-30.4,29.1,-34.2,20.7C-38,12.2,-38.4,2.7,-34.5,-3.8C-30.6,-10.3,-22.6,-13.8,-16.1,-19.7C-9.7,-25.6,-4.8,-33.9,0.9,-35C6.7,-36.2,13.4,-30.1,18.7,-24Z" stroke-width="0"></path>
                <path className={styles.rotate3} style={{ opacity: 0.3 }} fill="url(#sw-gradient)" d="M23,-28.9C29.3,-22.1,33.6,-14.4,34.6,-6.5C35.6,1.5,33.3,9.7,29.7,18.3C26.1,26.9,21.3,36,13.8,39.3C6.4,42.6,-3.6,40.1,-12.3,36C-21,31.9,-28.3,26.2,-31.6,19C-34.9,11.7,-34.2,2.9,-33.6,-6.8C-32.9,-16.5,-32.3,-27.1,-26.7,-34C-21.1,-40.9,-10.5,-44.1,-1.1,-42.8C8.3,-41.5,16.7,-35.7,23,-28.9Z" stroke-width="0"></path>
                <path className={styles.rotate4} style={{ opacity: 0.3 }} fill="url(#sw-gradient)" d="M28.1,-32.7C36.1,-26.9,42,-17.6,43.7,-7.7C45.4,2.2,42.9,12.8,37.6,21.6C32.4,30.4,24.3,37.5,15.4,39.4C6.6,41.4,-3.1,38.2,-12.6,34.7C-22.1,31.2,-31.4,27.3,-37.1,20.1C-42.8,12.9,-44.9,2.3,-42.5,-6.9C-40.1,-16,-33.3,-23.8,-25.5,-29.7C-17.7,-35.6,-8.8,-39.7,0.6,-40.4C10.1,-41.2,20.2,-38.6,28.1,-32.7Z" stroke-width="0"></path>
            </g>
        </svg>

        <div className={styles.overLay}></div>
        <div className={styles.shadowFilter}>
            <div
                className={styles.gradientBackground}
                ref={constraintsRef}
            >
                <div className={styles.container}>
                    <main className={styles.main}>
                        {/* {!isMobile && <ParticalBanner />} */}
                        <div>
                            <div className={styles.profile + " " + styles.bounceintop} />
                            <div className={styles.shadow} />
                        </div>
                        <h1 className={styles.title + " " + styles.textfocusin}>
                            Hi <span className={styles.wave}>👋</span>, I&apos;m <b>Troels Lund</b>
                        </h1>
                        <h3 className={styles.description + " mb-10 " + styles.textfocusin2}>
                            <Text initDelay={15} containerStyles={{ display: "inline-block", fontSize: "1.3rem" }} input='I am a software engineer' onlyWhenVisible keepUnderscore writeSpeed={200} />
                        </h3>
                        <Link href="about" legacyBehavior>
                            <div className={styles.actionbtn + " p-5"}>Learn more about me</div>
                        </Link>
                    </main>

                </div>
            </div>
        </div>
    </>;
};

export default BigBanner2;
