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
          <p className={styles.eyebrow}>Engineering Portfolio</p>
          <h1 className={styles.title}>Troels Lund</h1>
          <p className={styles.lead}>
            Software engineer building resilient digital products with a focus on performance,
            clarity, and operationally safe systems.
          </p>
          <div className={styles.ctaRow}>
            <LinkTransition className={styles.primaryCta} href="/projects">
              Explore Projects
            </LinkTransition>
            <LinkTransition className={styles.secondaryCta} href="/about">
              About Me
            </LinkTransition>
          </div>
          <div className={styles.tags}>
            <span className={styles.tag}>Full-stack Engineering</span>
            <span className={styles.tag}>Product-minded Delivery</span>
            <span className={styles.tag}>Performance, Concurrency &amp; Scale</span>
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
                alt="Portrait of Troels Elsvad Lund"
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
