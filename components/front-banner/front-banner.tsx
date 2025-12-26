import React from 'react';
import styles from './front-banner.module.css';
import Image from 'next/image';
import { VscGithubInverted } from 'react-icons/vsc';
import { SiLinkedin } from 'react-icons/si';
import Link from 'next/link';

function FrontBanner() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.copy}>
          <h1 className={styles.title}>Troels Lund</h1>
          <p className={styles.lead}>
            Software engineer crafting calm, high-performance web products with a focus on clarity
            and speed.
          </p>
          <div className={styles.ctaRow}>
            <Link className={styles.primaryCta} href="projects">
              View projects
            </Link>
            <Link className={styles.secondaryCta} href="about">
              About me
            </Link>
          </div>
          <div className={styles.tags}>
            <span className={styles.tag}>Software engineering 🧑🏽‍💻</span>
            <span className={styles.tag}>Product engineering 🛠️</span>
            <span className={styles.tag}>Performance & scalability 🚀</span>
          </div>
          <div className={styles.socials}>
            <a className={styles.socialLink} href="https://github.com/trolund">
              <VscGithubInverted color="currentColor" size={22} />
              GitHub
            </a>
            <a className={styles.socialLink} href="https://www.linkedin.com/in/trolund/">
              <SiLinkedin color="currentColor" size={22} />
              LinkedIn
            </a>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.deviceFrame}>
            <div className={styles.portraitWrap}>
              <Image
                className={styles.portrait}
                src="/profil3.jpg"
                priority
                alt="Portrait of Troels Lund"
                width={1200}
                height={1712}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FrontBanner;
