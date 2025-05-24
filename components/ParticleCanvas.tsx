'use client';

import React, { useEffect, useRef } from 'react';
import { getCssColorBasedOnPosition } from '../services/color-service';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
};

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCount = 2350;
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const initializeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reinitialize particles on resize
      particles.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        baseAlpha: 0.1,
      }));
    };

    initializeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    const handleResize = () => {
      initializeCanvas();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let p of particles.current) {
        const dx = cursor.x - p.x;
        const dy = cursor.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        // Tangent vector
        const tangentX = -dy / dist;
        const tangentY = dx / dist;

        const swirlStrength = Math.min(100 / dist, 4);
        p.vx += tangentX * swirlStrength * 0.02;

        const attractionStrength = 100 / dist;
        p.vx += (dx / dist) * attractionStrength * 0.003;
        p.vy += (dy / dist) * attractionStrength * 0.003;

        p.vy += tangentY * swirlStrength * 0.02;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.92;
        p.vy *= 0.92;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const alpha = Math.min(1, p.baseAlpha + (100 / dist) * 0.5);

        ctx.beginPath();
        ctx.fillStyle = getCssColorBasedOnPosition('--surface-4', alpha, p.x, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute left-0 top-0 h-screen w-screen" />;
};

export default ParticleCanvas;
