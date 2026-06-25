'use client';

import React, { useRef, useCallback } from 'react';
import styles from './front-banner.module.css';
import Image from 'next/image';
import LinkTransition from '../link-transition';
import SocialLinks from '../social-links';

function FrontBanner() {
  const frameRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ rx: 0, ry: 0 });
  const current = useRef({ rx: 0, ry: 0 });

  const startLoop = useCallback(() => {
    if (rafRef.current) return;
    const loop = () => {
      const c = current.current;
      const t = target.current;
      c.rx += (t.rx - c.rx) * 0.1;
      c.ry += (t.ry - c.ry) * 0.1;
      const frame = frameRef.current;
      if (frame) {
        frame.style.transform = `perspective(900px) rotateY(${c.ry}deg) rotateX(${c.rx}deg)`;
      }
      const still = Math.abs(t.rx - c.rx) < 0.01 && Math.abs(t.ry - c.ry) < 0.01;
      rafRef.current = still ? null : requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    target.current = { rx: -ny * 3, ry: nx * 4 };
    startLoop();
  }, [startLoop]);

  const onMouseLeave = useCallback(() => {
    target.current = { rx: 0, ry: 0 };
    startLoop();
  }, [startLoop]);

  return (
    <section className={styles.hero} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
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
          <div ref={frameRef} className={styles.deviceFrame}>
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
