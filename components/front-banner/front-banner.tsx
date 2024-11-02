'use client';

import React from 'react';
import styles from './front-banner.module.css';
import Text from '../text/text';
import { motion } from 'framer-motion';
import GradientSVG from '../gradient';
import Image from 'next/image';

function FrontBanner() {
  return (
    <div className="flex h-screen justify-center text-center align-middle">
      <GradientSVG />
      <main className="z-10 inline-flex flex-col justify-center gap-4 text-center align-middle">
        <Image
          className="ml-auto mr-auto rounded-full border-4 border-content-text"
          src="/profil.webp"
          alt="me"
          width={200}
          height={200}
        />
        <h1 className="text-7xl text-content-text">
          Hi <span className={styles.wave}>👋</span>, I&apos;m <strong>Troels Lund</strong>
        </h1>
        <h3 className="mb-10 text-2xl text-content-text">
          <motion.div
            height="40px"
            width="40px"
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
        {/* <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ scale: [1, 1.1, 1.1, 1] }}
        >
          <Link href="about" legacyBehavior>
            <div className={styles.actionbtn + ' p-5'}>Learn more about me</div>
          </Link>
        </motion.div> */}
      </main>
    </div>
  );
}

export default FrontBanner;
