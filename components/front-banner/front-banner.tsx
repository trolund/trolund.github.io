'use client';

import React from 'react';
import styles from './front-banner.module.css';
import Text from '../text/text';
import Image from 'next/image';
import { VscGithubInverted } from 'react-icons/vsc';
import { SiLinkedin } from 'react-icons/si';
import Link from 'next/link';

function FrontBanner() {
  return (
    <div className="flex h-dvh select-none justify-center text-center align-middle">
      <main className="z-20 inline-flex flex-col justify-center gap-6 text-center align-middle sm:gap-8 md:gap-12">
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
        <div className="bg-colors h-[5px] animate-pulse rounded-[8px] bg-cover" />
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
        <div className="relative flex justify-center">
          <div className="group relative inline-block">
            {/* Glow bubble matching button size */}
            <div
              className="absolute left-0 top-full -mt-1 rounded-full bg-[var(--surface-4)] opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out blur-md"
              style={{
                width: '100%',
                height: '1.2rem',
                transformOrigin: 'center top',
                pointerEvents: 'none', // So it doesn't block button events
              }}
            ></div>

            {/* Button */}
            <Link
              href="about"
              className="relative z-10 rounded-full bg-content-text px-8 py-4 font-semibold text-text transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-lg"
            >
              Learn more
            </Link>
          </div>
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
