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

type Cursor = {
  x: number;
  y: number;
};

// Helper to calculate particle count based on canvas size
function calculateParticleCount(
  width: number,
  height: number,
  density: number = 0.0005,
  maxParticles: number = 3000,
): number {
  const count = Math.floor(width * height * density);
  return Math.min(count, maxParticles);
}

function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const isMouseDown = useRef<boolean>(false);
  const particleCount = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const cursor: Cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ctx = canvas.getContext('2d')!;

    const initializeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particleCount.current = calculateParticleCount(canvas.width, canvas.height, 0.0005, 3000);

      particles.current = Array.from({ length: particleCount.current }, () => ({
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

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        cursor.x = e.touches[0].clientX;
        cursor.y = e.touches[0].clientY;
      }
    };

    const handleMouseDown = () => {
      isMouseDown.current = true;
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      isMouseDown.current = true;
      if (e.touches.length > 0) {
        cursor.x = e.touches[0].clientX;
        cursor.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      isMouseDown.current = false;
    };

    const handleResize = () => {
      initializeCanvas();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    // Simulate long press on load (center screen)
    cursor.x = window.innerWidth / 2;
    cursor.y = window.innerHeight / 2;
    isMouseDown.current = true;
    setTimeout(() => {
      isMouseDown.current = false;
    }, 1200);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let p of particles.current) {
        const dx = cursor.x - p.x;
        const dy = cursor.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;

        const tangentX = -uy;
        const tangentY = ux;

        const swirlStrength = Math.min(100 / dist, 4);
        const attractionStrength = 100 / dist;

        if (isMouseDown.current) {
          // If mouse is down, particles are repelled
          const repulsionStrength = Math.min(200 / dist, 8);
          p.vx -= ux * repulsionStrength * 0.05;
          p.vy -= uy * repulsionStrength * 0.05;
        } else {
          p.vx += ux * attractionStrength * 0.0003;
          p.vy += uy * attractionStrength * 0.0003;

          p.vx += tangentX * swirlStrength * 0.02;
          p.vy += tangentY * swirlStrength * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.92;
        p.vy *= 0.92;

        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          const towardCenterX = centerX - p.x;
          const towardCenterY = centerY - p.y;

          p.x += towardCenterX * getRandomNumber(0.1, 0.8);
          p.y += towardCenterY * getRandomNumber(0.1, 0.8);

          p.baseAlpha = 0.0; // reset transparency
        }

        // Fade in after respawn
        if (p.baseAlpha < 0.1) {
          p.baseAlpha += 0.005;
        }

        const alpha = Math.min(1, p.baseAlpha + (100 / dist) * 0.5);

        const glowColor = getCssColorBasedOnPosition('--surface-2', alpha * 0.5, p.x, p.y);
        const solidColor = getCssColorBasedOnPosition('--surface-4', alpha, p.x, p.y);

        // Glow layer
        ctx.save();
        if (alpha < 0.5) {
          ctx.shadowBlur = 50;
          ctx.shadowColor = glowColor;
          ctx.fillStyle = glowColor;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 1.4, 0, Math.PI * 2); // slightly larger radius for glow
        ctx.fill();
        ctx.restore();

        // Core particle
        ctx.fillStyle = solidColor;
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-dvh absolute left-0 top-0 h-dvh" />;
};

export default ParticleCanvas;
