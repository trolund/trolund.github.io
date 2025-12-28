'use client';

import React, { useEffect, useRef } from 'react';
import { getColorCssVarWithAlpha, getCssColorBasedOnPosition } from '../../services/color-service';
import { add, dist2, limit, mult, normalize, sub, Vec } from '../../services/vectorService';

type Particle = {
  pos: Vec;
  vel: Vec;
  acc: Vec;
  radius: number;
  baseAlpha: number;
};

// Box–Muller for Gaussian(0,1)
function gaussianRandom(): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function makeCirclePath(
  width: number,
  height: number,
  segments = 200,
  radiusFactor = 0.8, // fraction of half-min-dimension
): Vec[] {
  const pts: Vec[] = [];
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.5 * radiusFactor;

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = cx + Math.cos(theta) * radius;
    const y = cy + Math.sin(theta) * radius;
    pts.push({ x, y });
  }
  return pts;
}

// Project point onto polyline, find closest
function closestPointOnPath(path: Vec[], p: Vec) {
  let record = Infinity,
    closest: Vec = path[0],
    bestT = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i],
      b = path[i + 1];
    const ab = sub(b, a),
      ap = sub(p, a);
    const proj = Math.max(
      0,
      Math.min(1, (ap.x * ab.x + ap.y * ab.y) / (ab.x * ab.x + ab.y * ab.y)),
    );
    const pt = add(a, mult(ab, proj));
    const d2 = dist2(p, pt);
    if (d2 < record) {
      record = d2;
      closest = pt;
      bestT = (i + proj) / (path.length - 1);
    }
  }
  return { t: bestT, point: closest };
}

const VectorFieldParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const path = useRef<Vec[]>([]);
  const anim = useRef<number | null>(null);
  const resizeRaf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const reset = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      path.current = makeCirclePath(canvas.width, canvas.height, 300);
      const count = Math.floor(canvas.width * canvas.height * 0.0005);
      particles.current = Array.from({ length: count }, () => {
        const t0 = Math.random();
        const idx = Math.floor(t0 * (path.current.length - 1));
        return {
          pos: { ...path.current[idx] },
          vel: { x: 0, y: 0 },
          acc: { x: 0, y: 0 },
          radius: Math.random() * 2 + 1,
          baseAlpha: 0,
        };
      });
    };
    const handleResize = () => {
      if (resizeRaf.current !== null) return;
      resizeRaf.current = window.requestAnimationFrame(() => {
        resizeRaf.current = null;
        reset();
      });
    };
    window.addEventListener('resize', handleResize);
    reset();

    const animate = () => {
      // slight trail
      ctx.fillStyle = getColorCssVarWithAlpha('--bg', 0.1);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const lookAhead = 0.0035;
      const sigma = 200; // standard deviation for Gaussian spread

      for (let p of particles.current) {
        const { t: nearestT } = closestPointOnPath(path.current, p.pos);

        const targetT = Math.min(1, nearestT + lookAhead);
        const targetIdx = Math.floor(targetT * (path.current.length - 1));
        const targetPt = path.current[targetIdx];

        const nextIdx = Math.min(path.current.length - 1, targetIdx + 1);
        const tangent = normalize(sub(path.current[nextIdx], path.current[targetIdx]));
        const perp = { x: -tangent.y, y: tangent.x };

        const offset = gaussianRandom() * sigma;
        const jitter = mult(perp, offset);

        const desired = mult(normalize(sub(add(targetPt, jitter), p.pos)), 2);
        const steer = limit(sub(desired, p.vel), 0.1);

        p.acc = steer;
        p.vel = mult(add(p.vel, p.acc), 0.95);
        p.pos = add(p.pos, p.vel);

        if (p.baseAlpha < 0.1) p.baseAlpha += 0.2;
        const alpha = Math.min(1, p.baseAlpha);

        if (nearestT >= 0.999) {
          p.pos = { ...path.current[0] };
          p.vel = { x: 0, y: 0 };
          p.baseAlpha = 0;
        }

        const glow = getCssColorBasedOnPosition('--surface-5', alpha * 0.5, p.pos.x, p.pos.y);
        const solid = getCssColorBasedOnPosition('--surface-6', alpha, p.pos.x, p.pos.y);

        ctx.save();
        if (alpha < 0.5) {
          ctx.shadowBlur = 30;
          ctx.shadowColor = glow;
          ctx.fillStyle = glow;
        }
        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, p.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = solid;
        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      anim.current = requestAnimationFrame(animate);
    };

    anim.current = requestAnimationFrame(animate);
    return () => {
      if (anim.current) cancelAnimationFrame(anim.current);
      if (resizeRaf.current !== null) cancelAnimationFrame(resizeRaf.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed left-0 top-0 -z-10 h-dvh w-dvw"
      aria-label="Decorative particle animation background"
    />
  );
};

export default VectorFieldParticleCanvas;
