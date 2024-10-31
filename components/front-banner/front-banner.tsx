'use client';

import React from 'react';
import styles from './front-banner.module.css';
import Text from '../text/text';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GradientSVG from '../gradient';

function FrontBanner() {
  return (
    <>
      <GradientSVG />
      <div className={styles.overLay}></div>
      <div className={styles.shadowFilter}>
        <div className={styles.colorOne}>
          <div className={styles.container}>
            <main className={styles.main}>
              <div>
                <div className={styles.profile + ' ' + styles.bounceintop} />
                <div className={styles.shadow} />
              </div>
              <h1 className={styles.title + ' ' + styles.textfocusin}>
                Hi <span className={styles.wave}>👋</span>, I&apos;m <strong>Troels Lund</strong>
              </h1>
              <h3 className={styles.description + ' mb-10' + styles.textfocusin2}>
                <motion.div
                  height="40px"
                  width="40px"
                  style={{ display: 'inline-block', marginRight: '10px', backgroundColor: 'black' }}
                  animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                  }}
                />
                <Text
                  initDelay={15}
                  containerStyles={{ display: 'inline-block', fontSize: '1.3rem' }}
                  input="I am a software engineer"
                  onlyWhenVisible
                  keepUnderscore
                  writeSpeed={200}
                />
              </h3>
              <Link href="about" legacyBehavior>
                <div className={styles.actionbtn + ' p-5'}>Learn more about me</div>
              </Link>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default FrontBanner;
