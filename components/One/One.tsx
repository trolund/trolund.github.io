import React from 'react';
import styles from './One.module.css';

export interface OneProps { }

function One({ }: OneProps) {

    return <>
        <div className={styles.shadowfilter}>
            <div className={styles.colorOne}>
                <div className={styles.container}>
                    <main className={styles.main}>
                        <div>
                            <div className={styles.profile + " " + styles.bounceintop}></div>
                            <div className={styles.shadow} />
                        </div>
                        <h1 className={styles.title + " " + styles.textfocusin}>
                            Hi <span className={styles.wave}>👋</span>, I'm <b>Troels Lund</b>
                        </h1>
                        <h3 className={styles.description + " " + styles.textfocusin2}>
                            I am a software engineer
                        </h3>
                    </main>

                </div>
            </div>
        </div>
    </>;
};

export default One;
