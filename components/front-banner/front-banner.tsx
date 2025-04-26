'use client';

import React from 'react';
import styles from './front-banner.module.css';
import Text from '../text/text';
import GradientSVG from '../gradient';
import Image from 'next/image';
import { VscGithubInverted } from 'react-icons/vsc';
import { SiLinkedin } from 'react-icons/si';
import Link from 'next/link';

function FrontBanner() {
  return (
    <div className="flex h-dvh justify-center text-center align-middle">
      {/* <GradientSVG speed={0.1} size={40} /> */}
      <main className="z-10 inline-flex flex-col justify-center gap-6 text-center align-middle sm:gap-8 md:gap-12">
        <Image
          className="ml-auto mr-auto rounded-full border-4 border-content-text"
          src="/profil2.webp"
          priority
          alt="me"
          width={200}
          height={200}
        />
        <h1 className="text-4xl text-content-text sm:text-6xl md:text-7xl">
          Hi <span className={styles.wave}>👋</span>, I&apos;m <strong>Troels Lund</strong>
        </h1>
        <h3 className="text-content-text">
          <Text
            initDelay={15}
            containerStyles={{ display: 'inline-block', fontSize: '1.3rem' }}
            input="I am a software engineer"
            onlyWhenVisible
            keepUnderscore
            writeSpeed={200}
          />
        </h3>
        <div className="flex justify-center">
          <Link
            href="about"
            className="rounded-full bg-content-text p-4 pl-8 pr-8 font-semibold text-bg-color transition-all hover:scale-110"
          >
            Learn more
          </Link>
        </div>

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
