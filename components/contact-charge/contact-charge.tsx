'use client';

import { useEffect, useRef } from 'react';
import styles from './contact-charge.module.css';

type ChargeParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  charge: number;
  hue: number;
};

const ContactCharge = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<ChargeParticle[]>([]);
  const animationRef = useRef<number | null>(null);
  const isActiveRef = useRef(true);
  const flipCycleRef = useRef(0);
  const lastFlipTimeRef = useRef(0);

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

      const count = 50;
      particlesRef.current = Array.from({ length: count }, (_, index) => {
        const charge = index % 2 === 0 ? 1 : -1;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          charge,
          hue: charge > 0 ? 200 : 35,
        };
      });
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
      if (!lastFlipTimeRef.current) lastFlipTimeRef.current = now;
      if (now - lastFlipTimeRef.current >= 20000) {
        flipCycleRef.current += 1;
        lastFlipTimeRef.current = now;
      }

      ctx.fillStyle = 'rgba(8, 12, 20, 0.16)';
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const dist = Math.hypot(dx, dy) + 10;
          const isOpposite = p.charge !== q.charge;
          const intensity = isOpposite ? 520 : 160;
          const proximityBoost = isOpposite ? Math.min(7, 220 / dist) : 1;
          const force = (p.charge * q.charge * intensity * proximityBoost) / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          p.vx += fx * dt;
          p.vy += fy * dt;
          q.vx -= fx * dt;
          q.vy -= fy * dt;

          if (p.charge !== q.charge && dist < 160) {
            const alpha = (1 - dist / 160) * 0.35;
            ctx.strokeStyle = `rgba(140, 200, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p, index) => {
        if (flipCycleRef.current && p.hue >= 0) {
          const flipDelay = index * 200;
          const flipAt = lastFlipTimeRef.current + flipDelay;
          const flippedKey = `${flipCycleRef.current}-${index}`;
          if ((p as any).flipKey !== flippedKey && now >= flipAt) {
            p.charge *= -1;
            p.hue = p.charge > 0 ? 200 : 35;
            (p as any).flipKey = flippedKey;
          }
        }
        const flowAngle =
          Math.sin((p.x / width) * Math.PI * 2 + now * 0.0006) +
          Math.cos((p.y / height) * Math.PI * 2 - now * 0.0004);
        const flowStrength = 0.8;
        p.vx += Math.cos(flowAngle) * flowStrength * dt;
        p.vy += Math.sin(flowAngle) * flowStrength * dt;

        p.x += p.vx * (dt * 60);
        p.y += p.vy * (dt * 60);
        p.vx *= 0.94;
        p.vy *= 0.94;

        const margin = 16;
        if (p.x < margin) {
          p.x = margin;
          p.vx *= -1;
        }
        if (p.x > width - margin) {
          p.x = width - margin;
          p.vx *= -1;
        }
        if (p.y < margin) {
          p.y = margin;
          p.vy *= -1;
        }
        if (p.y > height - margin) {
          p.y = height - margin;
          p.vy *= -1;
        }

        ctx.fillStyle = `hsla(${p.hue}, 90%, 72%, 0.75)`;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 72%, 0.5)`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
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
    <section className={styles.charge} aria-labelledby="contact-charge-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.kicker}>Charge Field</p>
          <h2 className={styles.title} id="contact-charge-title">
            Repulsion and attraction
          </h2>
          <p className={styles.subtitle}>
            Charged particles push and pull, keeping the field in a dynamic balance.
          </p>
        </div>
        <div className={styles.stage} ref={stageRef}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-label="Charge field visualization"
          />
          <div className={styles.glow} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default ContactCharge;
