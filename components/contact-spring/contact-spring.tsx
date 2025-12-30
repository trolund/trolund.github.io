'use client';

import { useEffect, useRef } from 'react';
import styles from './contact-spring.module.css';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
};

const ContactSpring = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const linksRef = useRef<{ a: number; b: number; rest: number }[]>([]);
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

      const count = 8;
      const radius = Math.min(width, height) * 0.28;
      const centerX = width / 2;
      const centerY = height / 2;
      const nodes = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        return { x, y, vx: 0, vy: 0, baseX: x, baseY: y };
      });
      nodesRef.current = nodes;
      linksRef.current = nodes.map((node, index) => {
        const next = nodes[(index + 1) % nodes.length];
        const rest = Math.hypot(next.baseX - node.baseX, next.baseY - node.baseY);
        return { a: index, b: (index + 1) % nodes.length, rest };
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

      ctx.fillStyle = 'rgba(10, 16, 28, 0.16)';
      ctx.fillRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const stiffness = 4.5;
      const damping = 0.88;

      nodes.forEach((node, index) => {
        const t = now * 0.001;
        const anchorX = node.baseX + Math.sin(t + index) * 12;
        const anchorY = node.baseY + Math.cos(t * 1.1 + index) * 12;
        const dx = anchorX - node.x;
        const dy = anchorY - node.y;
        node.vx += dx * stiffness * dt;
        node.vy += dy * stiffness * dt;
      });

      linksRef.current.forEach((link) => {
        const a = nodes[link.a];
        const b = nodes[link.b];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 1;
        const diff = (dist - link.rest) / dist;
        const force = diff * 2.5;
        a.vx += dx * force * dt;
        a.vy += dy * force * dt;
        b.vx -= dx * force * dt;
        b.vy -= dy * force * dt;
      });

      nodes.forEach((node) => {
        node.vx *= damping;
        node.vy *= damping;
        node.x += node.vx * (dt * 60);
        node.y += node.vy * (dt * 60);
      });

      ctx.lineWidth = 1.8;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(130, 190, 255, 0.32)';
      ctx.beginPath();
      nodes.forEach((node, index) => {
        const next = nodes[(index + 1) % nodes.length];
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(next.x, next.y);
      });
      ctx.stroke();

      nodes.forEach((node) => {
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 32);
        glow.addColorStop(0, 'rgba(120, 200, 255, 0.45)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 32, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(180, 225, 255, 0.95)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5.5, 0, Math.PI * 2);
        ctx.fill();
      });

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
    <section className={styles.spring} aria-labelledby="contact-spring-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.kicker}>Spring Orbit</p>
          <h2 className={styles.title} id="contact-spring-title">
            Elastic constellation
          </h2>
          <p className={styles.subtitle}>
            Linked nodes oscillate in a soft spring network, keeping rhythm across the loop.
          </p>
        </div>
        <div className={styles.stage} ref={stageRef}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-label="Spring mass orbit visualization"
          />
          <div className={styles.glow} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default ContactSpring;
