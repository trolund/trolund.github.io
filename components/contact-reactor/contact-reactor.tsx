'use client';

import { useEffect, useMemo, useRef } from 'react';
import styles from './contact-reactor.module.css';

type Point = {
  x: number;
  y: number;
  z: number;
  size: number;
  hue: number;
  glow: number;
};

const contactItems = [
  {
    label: 'Email',
    value: 'Trolund@gmail.com',
    href: 'mailto:Trolund@gmail.com',
    note: 'Fastest response window.',
  },
  {
    label: 'Phone',
    value: '+45 29 45 66 60',
    href: 'tel:+4529456660',
    note: 'Copenhagen time zone.',
  },
  {
    label: 'Location',
    value: 'Copenhagen, DK',
    href: '#footer',
    note: 'Open to global collaboration.',
  },
];

const ringConfig = [
  { radius: 170, tiltX: 0.6, tiltY: 0.1, hue: 32 },
  { radius: 120, tiltX: -0.4, tiltY: 0.6, hue: 190 },
  { radius: 90, tiltX: 0.2, tiltY: -0.8, hue: 280 },
];

const ContactReactor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number | null>(null);
  const rotationRef = useRef({ x: 0.4, y: -0.6 });

  const nodes = useMemo(() => contactItems, []);

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
      height = rect.height || stage.offsetHeight || 460;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createPoints = () => {
      const points: Point[] = [
        { x: 160, y: -60, z: 60, size: 4.2, hue: 28, glow: 1 },
        { x: -140, y: 120, z: -70, size: 3.6, hue: 190, glow: 1 },
        { x: 80, y: 150, z: 110, size: 3.8, hue: 280, glow: 1 },
      ];

      const count = Math.floor((width * height) / 2600);
      for (let i = 0; i < count; i += 1) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * Math.PI * 2;
        const phi = Math.acos(2 * v - 1);
        const radius = 180 + Math.random() * 80;
        points.push({
          x: radius * Math.sin(phi) * Math.cos(theta),
          y: radius * Math.sin(phi) * Math.sin(theta),
          z: radius * Math.cos(phi),
          size: 1.1 + Math.random() * 1.6,
          hue: 200 + Math.random() * 120,
          glow: 0.4 + Math.random() * 0.6,
        });
      }
      pointsRef.current = points;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      createPoints();
    });
    resizeObserver.observe(stage);
    resize();
    createPoints();

    const handlePointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      pointerRef.current.x = (event.clientX - rect.left) / rect.width;
      pointerRef.current.y = (event.clientY - rect.top) / rect.height;
      pointerRef.current.active = true;
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerleave', handlePointerLeave);

    const project = (x: number, y: number, z: number) => {
      const fov = 520;
      const scale = fov / (fov + z);
      return {
        x: x * scale + width / 2,
        y: y * scale + height / 2,
        scale,
      };
    };

    const rotatePoint = (x: number, y: number, z: number, rotX: number, rotY: number) => {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      return { x: x1, y: y1, z: z2 };
    };

    const drawRing = (
      radius: number,
      tiltX: number,
      tiltY: number,
      hue: number,
      rotX: number,
      rotY: number,
      time: number,
    ) => {
      ctx.beginPath();
      const steps = 120;
      for (let i = 0; i <= steps; i += 1) {
        const angle = (i / steps) * Math.PI * 2 + time * 0.0002;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        const pz = Math.sin(angle * 0.6) * 20;
        const tilted = rotatePoint(px, py, pz, tiltX, tiltY);
        const rotated = rotatePoint(tilted.x, tilted.y, tilted.z, rotX, rotY);
        const projected = project(rotated.x, rotated.y, rotated.z);
        if (i === 0) ctx.moveTo(projected.x, projected.y);
        else ctx.lineTo(projected.x, projected.y);
      }
      ctx.strokeStyle = `hsla(${hue}, 90%, 62%, 0.45)`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    };

    const drawCore = (time: number) => {
      const pulse = 0.5 + Math.sin(time * 0.002) * 0.2;
      const coreGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.min(width, height) * 0.18,
      );
      coreGradient.addColorStop(0, `rgba(255, 200, 140, ${0.55 + pulse * 0.2})`);
      coreGradient.addColorStop(1, 'rgba(14, 20, 32, 0)');
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.18, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 200, 140, 0.5)';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.08, 0, Math.PI * 2);
      ctx.stroke();
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;
      const targetX = pointer.active ? (pointer.y - 0.5) * 0.8 : 0.3;
      const targetY = pointer.active ? (pointer.x - 0.5) * 1.0 : -0.4;

      rotationRef.current.x += (targetX - rotationRef.current.x) * 0.04;
      rotationRef.current.y += (targetY - rotationRef.current.y) * 0.04;

      const rotX = rotationRef.current.x + Math.sin(time * 0.0004) * 0.08;
      const rotY = rotationRef.current.y + Math.cos(time * 0.00035) * 0.08;

      drawCore(time);

      ctx.globalCompositeOperation = 'lighter';
      ringConfig.forEach((ring) => {
        drawRing(ring.radius, ring.tiltX, ring.tiltY, ring.hue, rotX, rotY, time);
      });
      ctx.globalCompositeOperation = 'source-over';

      const points = pointsRef.current
        .map((point) => {
          const rotated = rotatePoint(point.x, point.y, point.z, rotX, rotY);
          const projected = project(rotated.x, rotated.y, rotated.z);
          return { ...point, ...rotated, ...projected };
        })
        .sort((a, b) => (a.z ?? 0) - (b.z ?? 0));

      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        for (let j = i + 1; j < points.length && j < i + 28; j += 1) {
          const q = points[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 90) {
            const alpha = 1 - dist / 90;
            ctx.strokeStyle = `rgba(120, 160, 220, ${alpha * 0.18})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      points.forEach((point) => {
        const alpha = 0.45 + (point.glow ?? 0.3) * 0.5;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${point.hue}, 90%, 75%, ${alpha})`;
        ctx.shadowColor = `hsla(${point.hue}, 90%, 75%, 0.65)`;
        ctx.shadowBlur = point.size * 10;
        ctx.arc(point.x, point.y, point.size * 1.4 * (point.scale ?? 1), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <section className={styles.reactor} aria-labelledby="contact-reactor-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.kicker}>Contact</p>
          <h2 className={styles.title} id="contact-reactor-title">
            Signal tower for fast collaboration
          </h2>
          <p className={styles.subtitle}>
            A 3D contact reactor that stays live while you explore. Reach out through any channel,
            and I will answer quickly with clear next steps.
          </p>
          <div className={styles.statusRow}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>Available for select engineering and product work.</span>
          </div>
          <ul className={styles.contactGrid}>
            {nodes.map((item) => (
              <li key={item.label} className={styles.contactCard}>
                <span className={styles.contactLabel}>{item.label}</span>
                <a className={styles.contactValue} href={item.href}>
                  {item.value}
                </a>
                <span className={styles.contactNote}>{item.note}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.stage} ref={stageRef}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-label="Interactive 3D contact visualization"
          />
          <div className={styles.hud}>
            <div className={styles.hudLine}>Signal strength: 99%</div>
            <div className={styles.hudLine}>Latency: &lt; 1 business day</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactReactor;
