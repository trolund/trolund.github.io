'use client';

import React, { useEffect, useRef } from 'react';
import {
  getColorCssVarWithAlpha,
  getCssColorBasedOnPosition,
} from '../../services/color-service';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
};

type Pointer = {
  x: number;
  y: number;
  active: boolean;
  down: boolean;
};

function calculateParticleCount(
  width: number,
  height: number,
  density: number = 0.0008,
  maxParticles: number = 3000,
): number {
  const count = Math.floor(width * height * density);
  return Math.min(count, maxParticles);
}

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    vx: 0,
    vy: 0,
    radius: Math.random() * 2 + 1,
    baseAlpha: 0.0,
  };
}

function baseVectorField(x: number, y: number, time: number): { vx: number; vy: number } {
  const scale = 0.002;
  const t = time * 0.0004;
  const angle = Math.sin((x + t * 100) * scale) + Math.cos((y - t * 80) * scale);
  const strength = 4;
  return {
    vx: Math.cos(angle) * strength,
    vy: Math.sin(angle) * strength,
  };
}

// Attractor when pointer.down===false, Repeller when pointer.down===true
function pointerVectorField(
  x: number,
  y: number,
  pointer: Pointer
): { vx: number; vy: number } {
  if (!pointer.active) return { vx: 0, vy: 0 };

  const dx = pointer.x - x;
  const dy = pointer.y - y;
  const distSq = dx * dx + dy * dy;
  const radius = 140;
  const maxEffectDistSq = radius * radius;

  if (distSq > maxEffectDistSq) return { vx: 0, vy: 0 };

  const effect = (1 - distSq / maxEffectDistSq) ** 2;
  const strength = 8;
  // direction = +1 for pull, -1 for push
  const direction = pointer.down ? -1 : 1;

  return {
    vx: dx * effect * 0.01 * strength * direction,
    vy: dy * effect * 0.01 * strength * direction,
  };
}

const VectorFieldParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const particleCount = useRef<number>(0);
  const pointer = useRef<Pointer>({
    x: 0,
    y: 0,
    active: false,
    down: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const initializeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particleCount.current = calculateParticleCount(canvas.width, canvas.height);
      particles.current = Array.from(
        { length: particleCount.current },
        () => createParticle(canvas.width, canvas.height)
      );
    };

    const handleResize = () => initializeCanvas();
    const handleMouseMove = (e: MouseEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      pointer.current.active = true;
    };
    const handleMouseDown = () => { pointer.current.down = true; };
    const handleMouseUp = () => { pointer.current.down = false; };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.current.x = e.touches[0].clientX;
        pointer.current.y = e.touches[0].clientY;
        pointer.current.active = true;
      }
    };
    const handleTouchStart = (e: TouchEvent) => {
      pointer.current.down = true;
      if (e.touches.length > 0) {
        pointer.current.x = e.touches[0].clientX;
        pointer.current.y = e.touches[0].clientY;
        pointer.current.active = true;
      }
    };
    const handleTouchEnd = () => {
      pointer.current.active = false;
      pointer.current.down = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    initializeCanvas();

    const animate = () => {
      const time = performance.now();
      ctx.fillStyle = getColorCssVarWithAlpha('--bg', 0.09);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        const base = baseVectorField(p.x, p.y, time);
        const pointerF = pointerVectorField(p.x, p.y, pointer.current);

        // combine base flow + pointer interaction
        p.vx += (base.vx + pointerF.vx) * 0.05;
        p.vy += (base.vy + pointerF.vy) * 0.05;

        // move and damp
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.9; p.vy *= 0.9;

        // fade in
        if (p.baseAlpha < 0.1) p.baseAlpha += 0.005;
        const alpha = Math.min(1, p.baseAlpha);

        // respawn if out of bounds
        if (
          p.x < 0 || p.x > canvas.width ||
          p.y < 0 || p.y > canvas.height
        ) {
          particles.current[i] = createParticle(canvas.width, canvas.height);
          continue;
        }

        // draw
        const glow = getCssColorBasedOnPosition('--surface-5', alpha, p.x, p.y);
        const solid = getCssColorBasedOnPosition('--surface-6', alpha, p.x, p.y);

        ctx.save();
        if (alpha < 0.5) {
          ctx.shadowBlur = 50;
          ctx.shadowColor = glow;
          ctx.fillStyle = glow;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 1.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = solid;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed left-0 top-0 h-dvh w-dvw" />;
};

export default VectorFieldParticleCanvas;
