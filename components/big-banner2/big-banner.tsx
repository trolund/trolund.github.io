import React from 'react'
import styles from './big-banner.module.css'
import Text from '../text/text'
import Link from 'next/link'

function BigBanner2() {
    return <>
        <div className={styles.overLay}></div>
        <div className={styles.shadowFilter}>
            <div 
                className={styles.colorOne}
                >
                <div className={styles.container}>
                    <main className={styles.main}>
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
