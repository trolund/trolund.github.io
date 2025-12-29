'use client';

import { useEffect, useMemo, useRef } from 'react';
import styles from './contact-reactor.module.css';

type FieldParticle = {
  x: number;
  y: number;
  size: number;
  hue: number;
  speed: number;
  life: number;
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

const ContactReactor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<FieldParticle[]>([]);
  const seedsRef = useRef<{ x: number; y: number; hue: number }[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number | null>(null);

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

    const createSeeds = () => {
      const seeds: { x: number; y: number; hue: number }[] = [];
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.32;
      const rings = [radius * 0.6, radius * 0.85, radius];
      rings.forEach((r, ringIndex) => {
        const count = 18 + ringIndex * 6;
        for (let i = 0; i < count; i += 1) {
          const angle = (i / count) * Math.PI * 2;
          seeds.push({
            x: centerX + Math.cos(angle) * r,
            y: centerY + Math.sin(angle) * r,
            hue: 28 + ringIndex * 60,
          });
        }
      });

      const edgeCount = Math.floor((width + height) / 28);
      for (let i = 0; i < edgeCount; i += 1) {
        const t = i / edgeCount;
        seeds.push({ x: t * width, y: 0, hue: 200 });
        seeds.push({ x: t * width, y: height, hue: 220 });
      }
      seedsRef.current = seeds;
    };

    const createParticles = () => {
      const count = Math.floor((width * height) / 5200);
      const particles: FieldParticle[] = [];
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 1.1 + Math.random() * 1.6,
          hue: 180 + Math.random() * 120,
          speed: 0.6 + Math.random() * 1.2,
          life: Math.random() * 100,
        });
      }
      particlesRef.current = particles;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      createSeeds();
      createParticles();
    });
    resizeObserver.observe(stage);
    resize();
    createSeeds();
    createParticles();

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

    const fieldVector = (x: number, y: number, time: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.hypot(dx, dy) + 40;
      const angle = Math.atan2(dy, dx);

      const tangentX = -dy / dist;
      const tangentY = dx / dist;
      const radialX = dx / dist;
      const radialY = dy / dist;

      const swirl = 120 / dist;
      const drift = 18 / dist;
      let vx = tangentX * swirl + radialX * drift;
      let vy = tangentY * swirl + radialY * drift;

      const pointer = pointerRef.current;
      if (pointer.active) {
        const px = pointer.x * width;
        const py = pointer.y * height;
        const pdx = x - px;
        const pdy = y - py;
        const pdist = Math.hypot(pdx, pdy) + 30;
        const bend = 160 / pdist;
        vx += (-pdy / pdist) * bend;
        vy += (pdx / pdist) * bend;
      }

      const wobble = Math.sin((x + y) * 0.008 + time * 0.0012) * 0.35;
      vx += Math.cos(angle) * wobble;
      vy += Math.sin(angle) * wobble;

      return { vx, vy };
    };

    const drawFieldLines = (time: number) => {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.globalCompositeOperation = 'lighter';

      seedsRef.current.forEach((seed, index) => {
        let x = seed.x;
        let y = seed.y;
        ctx.beginPath();
        ctx.moveTo(x, y);

        const steps = 70;
        for (let i = 0; i < steps; i += 1) {
          const { vx, vy } = fieldVector(x, y, time);
          x += vx * 6;
          y += vy * 6;
          if (x < -40 || x > width + 40 || y < -40 || y > height + 40) break;
          ctx.lineTo(x, y);
        }

        const alpha = 0.18 + (index % 6) * 0.02;
        ctx.strokeStyle = `hsla(${seed.hue}, 90%, 70%, ${alpha})`;
        ctx.stroke();
      });

      ctx.restore();
    };

    const drawParticles = (time: number) => {
      particlesRef.current.forEach((particle) => {
        const { vx, vy } = fieldVector(particle.x, particle.y, time);
        particle.x += vx * particle.speed;
        particle.y += vy * particle.speed;
        particle.life -= 1;

        if (
          particle.life <= 0 ||
          particle.x < -60 ||
          particle.x > width + 60 ||
          particle.y < -60 ||
          particle.y > height + 60
        ) {
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
          particle.life = 60 + Math.random() * 120;
        }

        ctx.beginPath();
        ctx.fillStyle = `hsla(${particle.hue}, 90%, 75%, 0.7)`;
        ctx.shadowColor = `hsla(${particle.hue}, 90%, 75%, 0.6)`;
        ctx.shadowBlur = 12;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      drawCore(time);
      drawFieldLines(time);
      drawParticles(time);

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
