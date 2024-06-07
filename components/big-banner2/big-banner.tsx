import React, { useRef } from 'react'
import styles from './big-banner.module.css'
import Text from '../text/text'
import { motion, useTransform, useScroll } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import ParticalBanner from '../partical-banner'
import { isMobile } from 'react-device-detect'
import Link from 'next/link'

export interface OneProps { }

function BigBanner2({ }: OneProps) {

    const constraintsRef = useRef(null)

    const { scrollYProgress } = useScroll()
    const height = useTransform(scrollYProgress, [0, 1], [1, 0.8]);  

    const isSmallScreen = useMediaQuery({
        query: '(max-width: 720px)'
    })

    return <>
        <div className={styles.overLay}></div>
        <div className={styles.shadowFilter}>
            <div 
                className={styles.colorOne} 
                ref={constraintsRef}
                // style={{ scale: isSmallScreen ? 1 : height }}
                >
                <div className={styles.container}>
                    <main className={styles.main}>
                        {!isMobile && <ParticalBanner />}
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
                        <Link href="about">
                        <div className={styles.actionbtn + " p-5"}>Learn more about me</div>          
                        </Link>              
                    </main>

                </div>
            </div>
        </div>
    </>;
};

export default BigBanner2;
