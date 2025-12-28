import React from 'react';
import styles from './front-banner.module.css';
import Image from 'next/image';
import LinkTransition from '../link-transition';
import SocialLinks from '../social-links';

function FrontBanner() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.copy}>
          <h1 className={styles.title}>Troels Lund</h1>
          <p className={styles.lead}>
            Software engineer turning complex ideas into clear, fast, and highly-engineered products.
          </p>
          <div className={styles.ctaRow}>
            <LinkTransition className={styles.primaryCta} href="projects">
              View projects
            </LinkTransition>
            <LinkTransition className={styles.secondaryCta} href="about">
              About me
            </LinkTransition>
          </div>
          <div className={styles.tags}>
            <span className={styles.tag}>Software engineering 🧑🏽‍💻</span>
            <span className={styles.tag}>Product-minded builder 🛠️</span>
            <span className={styles.tag}>Performance, concurrency & scalability 🚀</span>
          </div>
          <SocialLinks />
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
