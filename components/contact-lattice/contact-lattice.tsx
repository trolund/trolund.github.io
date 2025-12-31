'use client';

import { useEffect, useRef } from 'react';
import styles from './contact-lattice.module.css';

type LatticePoint = {
  x: number;
  y: number;
  offset: number;
};

const ContactLattice = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<LatticePoint[][]>([]);
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
    let time = 0;

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

      const cols = 16;
      const rows = 10;
      const grid: LatticePoint[][] = [];
      for (let y = 0; y < rows; y += 1) {
        const row: LatticePoint[] = [];
        for (let x = 0; x < cols; x += 1) {
          row.push({
            x: (x / (cols - 1)) * width,
            y: (y / (rows - 1)) * height,
            offset: Math.random() * Math.PI * 2,
          });
        }
        grid.push(row);
      }
      gridRef.current = grid;
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
      time = now * 0.001;

      ctx.fillStyle = 'rgba(8, 12, 20, 0.16)';
      ctx.fillRect(0, 0, width, height);

      const grid = gridRef.current;
      const waveX = Math.sin(time * 0.8) * 0.6;
      const waveY = Math.cos(time * 0.6) * 0.6;

      ctx.strokeStyle = 'rgba(120, 190, 255, 0.26)';
      ctx.lineWidth = 1;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      for (let y = 0; y < grid.length; y += 1) {
        ctx.beginPath();
        for (let x = 0; x < grid[y].length; x += 1) {
          const point = grid[y][x];
          const wobble = Math.sin(point.offset + time * 1.2 + x * waveX + y * waveY) * 10;
          const px = point.x + Math.cos(point.offset + time * 0.8) * wobble * 0.6;
          const py = point.y + wobble;
          if (x === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      for (let x = 0; x < grid[0].length; x += 1) {
        ctx.beginPath();
        for (let y = 0; y < grid.length; y += 1) {
          const point = grid[y][x];
          const wobble = Math.sin(point.offset + time * 1.2 + x * waveX + y * waveY) * 10;
          const px = point.x + Math.cos(point.offset + time * 0.8) * wobble * 0.6;
          const py = point.y + wobble;
          if (y === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

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
    <section className={styles.lattice} aria-labelledby="contact-lattice-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.kicker}>Elastic Lattice</p>
          <h2 className={styles.title} id="contact-lattice-title">
            Tensioned grid
          </h2>
          <p className={styles.subtitle}>
            A spring lattice flexes as waves propagate diagonally across the structure.
          </p>
        </div>
        <div className={styles.stage} ref={stageRef}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-label="Elastic lattice visualization"
          />
          <div className={styles.glow} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default ContactLattice;
