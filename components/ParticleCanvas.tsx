'use client';

import React, { useEffect, useRef } from 'react';
import { getCssColor } from '../services/color-service';

type Particle = {
    x: number;
    y: number;
    vx: number; // Velocity in x direction
    vy: number; // Velocity in y direction
    radius: number;
    baseAlpha: number;
};

const ParticleCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particleCount = 2350;


    useEffect(() => {
        const particles: Particle[] = [];
        const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                radius: Math.random() * 2 + 1,
                baseAlpha: 0.1,
            });
        }

        const handleMouseMove = (e: MouseEvent) => {
            cursor.x = e.clientX;
            cursor.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let p of particles) {
                // Calculate attraction to cursor
                const dx = cursor.x - p.x;
                const dy = cursor.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const force = Math.min(100 / (dist || 1), 5);

                p.vx += (dx / dist) * force * 0.01;
                p.vy += (dy / dist) * force * 0.01;

                // Apply velocity and friction
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.85;
                p.vy *= 0.85;

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Brightness when near cursor
                const alpha = Math.min(1, p.baseAlpha + (100 / (dist || 1)) * 0.5);

                ctx.beginPath();
                ctx.fillStyle = getCssColor('--surface-4', alpha);
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className='absolute w-screen h-screen left-0 top-0' />;
};

export default ParticleCanvas;
