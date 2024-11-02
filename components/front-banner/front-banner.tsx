'use client';

import React from 'react';
import styles from './front-banner.module.css';
import Text from '../text/text';
import { motion } from 'framer-motion';
import GradientSVG from '../gradient';
import Image from 'next/image';
import { VscGithubInverted } from 'react-icons/vsc';
import { SiLinkedin } from 'react-icons/si';

function FrontBanner() {
  return (
    <div className="h-dvh flex justify-center text-center align-middle">
      <GradientSVG />
      <main className="z-10 inline-flex flex-col justify-center gap-4 text-center align-middle">
        <Image
          className="ml-auto mr-auto rounded-full border-4 border-content-text"
          src="/profil.webp"
          alt="me"
          width={200}
          height={200}
        />
        <h1 className="text-4xl text-content-text sm:text-6xl md:text-7xl">
          Hi <span className={styles.wave}>👋</span>, I&apos;m <strong>Troels Lund</strong>
        </h1>
        <h3 className="mb-10 text-content-text">
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
        <div className="ml-auto mr-auto flex gap-4">
          <a className="transition-all hover:scale-110" href="https://github.com/trolund">
            <VscGithubInverted color="var(--content-text)" size={40} />
          </a>
          <a className="transition-all hover:scale-110" href="https://www.linkedin.com/in/trolund/">
            <SiLinkedin color="var(--content-text)" size={40} />
          </a>
        </div>
      </main>
    </div>
  );
}

export default FrontBanner;
