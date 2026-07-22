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

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      target.current = { rx: -ny * 3, ry: nx * 4 };
      startLoop();
    },
    [startLoop],
  );

  const onMouseLeave = useCallback(() => {
    target.current = { rx: 0, ry: 0 };
    startLoop();
  }, [startLoop]);

  return (
    <section className={styles.hero} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className={styles.heroInner}>
        <div className={styles.copyHead}>
          <p className={styles.eyebrow}>Engineering Portfolio</p>
          <h1 className="m-0 text-balance text-[clamp(2.9rem,6vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em] [font-family:var(--font-space-grotesk),var(--font-manrope),sans-serif]">
            Troels Lund
          </h1>
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
        <div className={styles.copyBody}>
          <p className={styles.lead}>
            Software engineer building resilient digital products with a focus on performance,
            clarity, and operationally safe systems.
          </p>
          <div className={styles.ctaRow}>
            <LinkTransition
              className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-content-text px-6 py-3.5 text-[0.94rem] font-semibold tracking-[0.02em] text-bg shadow-[0_18px_44px_rgba(19,19,19,0.16)] transition-[transform,translate,box-shadow,background-color,color,border-color] duration-300 ease-[ease] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(19,19,19,0.25)] motion-reduce:transition-none"
              href="/projects"
            >
              Explore Projects
            </LinkTransition>
            <LinkTransition
              className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-[rgba(20,22,32,0.1)] bg-[rgba(255,255,255,0.72)] px-6 py-3.5 text-[0.94rem] font-semibold tracking-[0.02em] text-content-text backdrop-blur-[14px] transition-[transform,translate,box-shadow,background-color,color,border-color] duration-300 ease-[ease] hover:-translate-y-0.5 hover:border-[rgba(20,22,32,0.3)] motion-reduce:transition-none dark:border-[rgba(255,255,255,0.2)] dark:bg-[rgba(14,18,30,0.76)] dark:text-[rgba(235,238,255,0.9)]"
              href="/about"
            >
              About Me
            </LinkTransition>
          </div>
          <div className={styles.tags}>
            <span className="rounded-full border border-[rgba(20,22,32,0.06)] bg-[rgba(255,255,255,0.76)] px-3.5 py-[9px] text-[0.8rem] font-semibold tracking-[0.02em] text-[rgba(35,38,53,0.76)] dark:border-[rgba(255,255,255,0.12)] dark:bg-[rgba(12,16,28,0.65)] dark:text-[rgba(226,231,255,0.8)]">
              Full-stack Engineering
            </span>
            <span className="rounded-full border border-[rgba(20,22,32,0.06)] bg-[rgba(255,255,255,0.76)] px-3.5 py-[9px] text-[0.8rem] font-semibold tracking-[0.02em] text-[rgba(35,38,53,0.76)] dark:border-[rgba(255,255,255,0.12)] dark:bg-[rgba(12,16,28,0.65)] dark:text-[rgba(226,231,255,0.8)]">
              Product-minded Delivery
            </span>
            <span className="rounded-full border border-[rgba(20,22,32,0.06)] bg-[rgba(255,255,255,0.76)] px-3.5 py-[9px] text-[0.8rem] font-semibold tracking-[0.02em] text-[rgba(35,38,53,0.76)] dark:border-[rgba(255,255,255,0.12)] dark:bg-[rgba(12,16,28,0.65)] dark:text-[rgba(226,231,255,0.8)]">
              Performance, Concurrency &amp; Scale
            </span>
          </div>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}

export default FrontBanner;
