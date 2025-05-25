'use client';

import React, { useEffect, useRef } from 'react';

const palette = ['#ffdd66', '#ff9900', '#ff6600', '#ff3300'];

const SunParticleCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: any[] = [];
        const sun = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 80,
            pulse: 0,
        };

        for (let i = 0; i < 200; i++) {
            const initialRadius = Math.random() * 20 + sun.radius + 10;
            particles.push({
                angle: Math.random() * Math.PI * 2,
                radius: initialRadius,
                baseRadius: initialRadius,
                speed: Math.random() * 0.01 + 0.002,
                drift: Math.random() * 0.4 + 0.2,
                size: Math.random() * 3 + 1,
                alpha: 1,
                color: palette[Math.floor(Math.random() * palette.length)],
                trail: [], // store past positions
            });
        }

        function drawSun() {
            const gradient = ctx.createRadialGradient(
                sun.x,
                sun.y,
                sun.radius * 0.2,
                sun.x,
                sun.y,
                sun.radius * 2
            );
            gradient.addColorStop(0, '#fff9c4');
            gradient.addColorStop(0.3, '#ffeb3b');
            gradient.addColorStop(0.6, '#ff9800');
            gradient.addColorStop(1, 'rgba(255, 87, 34, 0)');

            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(sun.x, sun.y, sun.radius + Math.sin(sun.pulse) * 5, 0, Math.PI * 2);
            ctx.fill();
        }

        function drawParticles() {
            for (let p of particles) {
                const x = sun.x + Math.cos(p.angle) * p.radius;
                const y = sun.y + Math.sin(p.angle) * p.radius;

                // Update trail
                p.trail.push({ x, y });
                if (p.trail.length > 10) p.trail.shift(); // limit trail length

                // Draw trail
                for (let i = 0; i < p.trail.length; i++) {
                    const pos = p.trail[i];
                    const tAlpha = (i + 1) / p.trail.length * p.alpha;
                    ctx.beginPath();
                    ctx.globalAlpha = tAlpha;
                    ctx.fillStyle = p.color;
                    ctx.arc(pos.x, pos.y, p.size * (i / p.trail.length), 0, Math.PI * 2);
                    ctx.fill();
                }

                // Draw head particle
                ctx.beginPath();
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.arc(x, y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;

                // Move particle
                p.angle += p.speed;
                p.radius += p.drift;

                // Fade out and reset
                const distance = p.radius - p.baseRadius;
                p.alpha = Math.max(0, 1 - distance / 300);
                if (distance > 300) {
                    p.radius = p.baseRadius;
                    p.alpha = 1;
                    p.angle = Math.random() * Math.PI * 2;
                    p.color = palette[Math.floor(Math.random() * palette.length)];
                    p.trail = [];
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawSun();
            drawParticles();
            sun.pulse += 0.05;
            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            sun.x = canvas.width / 2;
            sun.y = canvas.height / 2;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="fixed left-0 top-0 h-full w-full z-[-1]" />;
};

export default SunParticleCanvas;
