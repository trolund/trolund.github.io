'use client';

import { useEffect, useRef } from 'react';
import styles from './contact-waves.module.css';

const ContactWaves = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

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
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(stage);
    resize();

    const animate = (now: number) => {
      time = now;
      ctx.clearRect(0, 0, width, height);

      const amplitude = Math.min(height * 0.18, 90);
      const baseY = height * 0.5;
      const waveLength = Math.max(width * 0.6, 520);
      const phase = time * 0.0015;

      const edgeFade = ctx.createLinearGradient(0, 0, width, 0);
      edgeFade.addColorStop(0, 'rgba(0, 0, 0, 0)');
      edgeFade.addColorStop(0.08, 'rgba(0, 0, 0, 1)');
      edgeFade.addColorStop(0.92, 'rgba(0, 0, 0, 1)');
      edgeFade.addColorStop(1, 'rgba(0, 0, 0, 0)');

      const drawWave = (widthScale: number, alpha: number, blur: number) => {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.filter = `blur(${blur}px)`;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const theta = (x / waveLength) * Math.PI * 2 + phase;
          const y =
            baseY +
            Math.sin(theta) * amplitude * widthScale +
            Math.sin(theta * 0.6 + phase * 0.7) * (amplitude * 0.25);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const stroke = ctx.createLinearGradient(0, 0, width, 0);
        stroke.addColorStop(0, 'rgba(90, 200, 230, 0)');
        stroke.addColorStop(0.2, 'rgba(90, 200, 230, 0.55)');
        stroke.addColorStop(0.5, 'rgba(140, 210, 255, 0.9)');
        stroke.addColorStop(0.8, 'rgba(90, 200, 230, 0.55)');
        stroke.addColorStop(1, 'rgba(90, 200, 230, 0)');
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.restore();
      };

      drawWave(1.0, 0.8, 8);
      drawWave(0.85, 0.6, 14);
      drawWave(1.15, 0.4, 18);

      ctx.save();
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = edgeFade;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className={styles.waves} aria-labelledby="contact-waves-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.kicker}>Wavefield</p>
          <h2 className={styles.title} id="contact-waves-title">
            Perpetual signal tides
          </h2>
          <p className={styles.subtitle}>
            Continuous flow lines that never terminate, echoing an always-on contact channel.
          </p>
        </div>
        <div className={styles.stage} ref={stageRef}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-label="Continuous wave field visualization"
          />
          <div className={styles.glow} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default ContactWaves;
