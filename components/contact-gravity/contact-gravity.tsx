'use client';

import { useEffect, useRef } from 'react';
import styles from './contact-gravity.module.css';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
};

const ContactGravity = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const isActiveRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      width = rect.width || stage.offsetWidth || 640;
      height = rect.height || stage.offsetHeight || 420;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(120, Math.floor((width * height) / 7000));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        hue: 200 + Math.random() * 80,
      }));
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    resize();

    let lastTime = 0;
    const minFrameMs = 1000 / 50;
    const start = () => {
      if (animationRef.current === null) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    const stop = () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
    const syncActiveState = () => {
      if (document.hidden || !isActiveRef.current) stop();
      else start();
    };

    const animate = (now: number) => {
      if (document.hidden || !isActiveRef.current) {
        animationRef.current = null;
        return;
      }
      const delta = lastTime ? Math.min(40, now - lastTime) : 16;
      lastTime = now;
      if (delta < minFrameMs) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      const dt = delta / 1000;

      ctx.fillStyle = 'rgba(8, 12, 20, 0.18)';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const gravity = 55;

      ctx.globalCompositeOperation = 'lighter';
      particlesRef.current.forEach((particle) => {
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const dist = Math.hypot(dx, dy) + 40;
        const force = gravity / dist;
        const swirl = 18 / dist;
        particle.vx += (dx / dist) * force * dt;
        particle.vy += (dy / dist) * force * dt;
        particle.vx += (-dy / dist) * swirl * dt;
        particle.vy += (dx / dist) * swirl * dt;

        particle.x += particle.vx * (dt * 60);
        particle.y += particle.vy * (dt * 60);
        particle.vx *= 0.992;
        particle.vy *= 0.992;

        if (particle.x < -40) particle.x = width + 40;
        if (particle.x > width + 40) particle.x = -40;
        if (particle.y < -40) particle.y = height + 40;
        if (particle.y > height + 40) particle.y = -40;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${particle.hue}, 90%, 72%, 0.45)`;
        ctx.arc(particle.x, particle.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
      const core = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 120);
      core.addColorStop(0, 'rgba(140, 210, 255, 0.22)');
      core.addColorStop(1, 'rgba(8, 12, 20, 0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isActiveRef.current = entry.isIntersecting;
        syncActiveState();
      },
      { threshold: 0.1 },
    );
    visibilityObserver.observe(stage);
    document.addEventListener('visibilitychange', syncActiveState);
    syncActiveState();

    return () => {
      stop();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', syncActiveState);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className={styles.gravity} aria-labelledby="contact-gravity-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.kicker}>Gravity Swarm</p>
          <h2 className={styles.title} id="contact-gravity-title">
            Orbital attraction
          </h2>
          <p className={styles.subtitle}>
            Particles slingshot around a central attractor, building momentum and cohesion.
          </p>
        </div>
        <div className={styles.stage} ref={stageRef}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-label="Gravitational swarm visualization"
          />
          <div className={styles.glow} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default ContactGravity;
