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
            particles.push({
                angle: Math.random() * Math.PI * 2,
                radius: Math.random() * 200 + 80,
                speed: Math.random() * 0.01 + 0.002,
                size: Math.random() * 3 + 1,
                alpha: Math.random() * 0.5 + 0.3,
                color: palette[Math.floor(Math.random() * palette.length)],
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

                ctx.beginPath();
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.arc(x, y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;

                p.angle += p.speed;
                p.radius += Math.sin(p.angle * 5) * 0.2; // dynamic wave
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
