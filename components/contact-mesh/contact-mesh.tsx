'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './contact-mesh.module.css';

type Node = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  hue: number;
  phase: number;
};

type Pulse = {
  from: number;
  to: number;
  progress: number;
  speed: number;
  hue: number;
};

type BeamRipple = {
  from: number;
  to: number;
  progress: number;
  hue: number;
};

const ContactMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const ripplesRef = useRef<BeamRipple[]>([]);
  const animationRef = useRef<number | null>(null);
  const isActiveRef = useRef(true);
  const [nodeCount, setNodeCount] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let lastTime = 0;

    const createNodes = (count: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.24;
      const nodes: Node[] = [];

      for (let i = 0; i < count; i += 1) {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          radius: 10,
          hue: 200 + (i * 360) / count,
          phase: Math.random() * Math.PI * 2,
        });
      }

      nodesRef.current = nodes;
    };

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
      createNodes(nodeCount);
    };

    const createPulse = (from: number, to: number, hue: number) => {
      pulsesRef.current.push({
        from,
        to,
        progress: 0,
        speed: 0.35 + Math.random() * 0.35,
        hue,
      });
    };

    const createInitialPulses = () => {
      pulsesRef.current = [];
      for (let i = 0; i < nodeCount; i += 1) {
        const next = (i + 1) % nodeCount;
        const hue = nodesRef.current[i]?.hue ?? 200;
        createPulse(i, next, hue);
      }
      ripplesRef.current = [];
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      createInitialPulses();
    });
    resizeObserver.observe(stage);
    resize();
    createInitialPulses();

    const drawBeam = (from: Node, to: Node) => {
      const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
      gradient.addColorStop(0, 'rgba(120, 170, 255, 0.2)');
      gradient.addColorStop(0.5, 'rgba(120, 170, 255, 0.35)');
      gradient.addColorStop(1, 'rgba(120, 170, 255, 0.2)');
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    };

    const drawRippleBeam = (from: Node, to: Node, ripple: BeamRipple) => {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const length = Math.hypot(dx, dy) || 1;
      const nx = -dy / length;
      const ny = dx / length;
      const amplitude = 6 * (1 - ripple.progress);

      ctx.beginPath();
      const steps = 40;
      for (let i = 0; i <= steps; i += 1) {
        const t = i / steps;
        const wave = Math.sin((t - ripple.progress) * Math.PI * 4) * amplitude;
        const x = from.x + dx * t + nx * wave;
        const y = from.y + dy * t + ny * wave;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `hsla(${ripple.hue}, 90%, 70%, ${0.45 * (1 - ripple.progress)})`;
      ctx.lineWidth = 2.2;
      ctx.stroke();
    };

    const drawNode = (node: Node, time: number) => {
      const glowStrength = 0.35 + Math.sin(time * 0.002 + node.phase) * 0.15;
      const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 46);
      glow.addColorStop(0, `hsla(${node.hue}, 90%, 70%, ${glowStrength})`);
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 46, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `hsla(${node.hue}, 90%, 70%, 0.95)`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPulse = (pulse: Pulse) => {
      const from = nodesRef.current[pulse.from];
      const to = nodesRef.current[pulse.to];
      const x = from.x + (to.x - from.x) * pulse.progress;
      const y = from.y + (to.y - from.y) * pulse.progress;
      ctx.fillStyle = `hsla(${pulse.hue}, 90%, 70%, 0.9)`;
      ctx.shadowColor = `hsla(${pulse.hue}, 90%, 70%, 0.7)`;
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(x, y, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    let lastFrame = 0;
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
      if (now - lastFrame < minFrameMs) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrame = now;
      const delta = lastTime ? Math.min(40, now - lastTime) : 16;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      nodes.forEach((node, index) => {
        const drift = 10 + index * 4;
        node.x = node.baseX + Math.sin(now * 0.0006 + node.phase) * drift;
        node.y = node.baseY + Math.cos(now * 0.0008 + node.phase) * drift;
      });

      if (nodes.length >= 2) {
        for (let i = 0; i < nodes.length; i += 1) {
          for (let j = i + 1; j < nodes.length; j += 1) {
            drawBeam(nodes[i], nodes[j]);
          }
        }
      }

      ripplesRef.current = ripplesRef.current.filter((ripple) => ripple.progress < 1);
      ripplesRef.current.forEach((ripple) => {
        ripple.progress += delta / 900;
        const from = nodesRef.current[ripple.from];
        const to = nodesRef.current[ripple.to];
        drawRippleBeam(from, to, ripple);
      });

      pulsesRef.current.forEach((pulse) => {
        pulse.progress += (pulse.speed * delta) / 1000;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          const options = nodes.map((_, index) => index).filter((index) => index !== pulse.to);
          const next = options[Math.floor(Math.random() * options.length)];
          pulse.from = pulse.to;
          pulse.to = next;
          pulse.hue = nodesRef.current[pulse.from].hue;
          ripplesRef.current.push({ from: pulse.from, to: pulse.to, progress: 0, hue: pulse.hue });
        }
        drawPulse(pulse);
      });

      nodes.forEach((node) => drawNode(node, now));

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
  }, [nodeCount]);

  return (
    <section className={styles.mesh} aria-labelledby="contact-mesh-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.kicker}>Signal Mesh</p>
          <h2 className={styles.title} id="contact-mesh-title">
            Adaptive relay mesh
          </h2>
          <p className={styles.subtitle}>
            Signals propagate across a closed mesh, keeping every channel in sync.
          </p>
          <div className={styles.controls}>
            <label className={styles.sliderLabel} htmlFor="mesh-node-count">
              Node count
            </label>
            <div className={styles.sliderRow}>
              <input
                id="mesh-node-count"
                className={styles.slider}
                type="range"
                min={2}
                max={25}
                value={nodeCount}
                onChange={(event) => setNodeCount(Number(event.target.value))}
              />
              <span className={styles.sliderValue}>{nodeCount}</span>
            </div>
          </div>
        </div>
        <div className={styles.stage} ref={stageRef}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-label="Signal propagation mesh visualization"
          />
          <div className={styles.glow} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default ContactMesh;
