'use client';

import React, { useEffect, useRef } from 'react';
import { getColorCssVarWithAlpha, getHexColor } from '../../services/color-service';

const secondaryPaletteVars = ['--secondary-0', '--secondary-1', '--secondary-2', '--secondary-3'];

const DayParticleCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const maxNumberOfParticles = 400;

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const palette = secondaryPaletteVars.map(getHexColor);

        const particles: any[] = [];
        const burstParticles: any[] = [];

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
                drift: Math.random() * 0.2 + 0.1,
                size: Math.random() * 3 + 1,
                alpha: 1,
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
                sun.radius * 2,
            );
            gradient.addColorStop(0, getHexColor('--secondary-0') || '#fff9c4');
            gradient.addColorStop(0.3, getHexColor('--secondary-1') || '#ffeb3b');
            gradient.addColorStop(0.6, getHexColor('--secondary-2') || '#ff9800');
            gradient.addColorStop(1, getHexColor('--secondary-3') || '#f57c00');

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
                p.radius += p.drift;

                const distance = p.radius - p.baseRadius;
                p.alpha = Math.max(0, 1 - distance / 300);

                if (distance > 300) {
                    p.radius = p.baseRadius;
                    p.alpha = 1;
                    p.angle = Math.random() * Math.PI * 2;
                    p.color = palette[Math.floor(Math.random() * palette.length)];
                }
            }
        }

        function emitBurst(count: number) {
            for (let i = 0; i < count; i++) {
                if (burstParticles.length >= maxNumberOfParticles) {
                    break; // Limit the number of burst particles
                }

                const angle = Math.random() * Math.PI * 2;
                const radius = sun.radius + 10;
                burstParticles.push({
                    angle,
                    radius,
                    baseRadius: radius,
                    speed: Math.random() * 0.02 + 0.01,
                    drift: Math.random() * 0.4 + 0.2, //  drift: Math.random() * 0.2 + 0.1,
                    size: Math.random() + 2,
                    alpha: 1,
                    color: palette[Math.floor(Math.random() * palette.length)],
                });
            }
        }

        function drawBurstParticles() {
            for (let i = burstParticles.length - 1; i >= 0; i--) {
                const p = burstParticles[i];

                const x = sun.x + Math.cos(p.angle) * p.radius;
                const y = sun.y + Math.sin(p.angle) * p.radius;

                ctx.beginPath();
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.fillStyle = p.color;
                ctx.arc(x, y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;

                p.angle += p.speed;
                p.radius += p.drift;
                p.alpha -= 0.001;

                if (p.alpha <= 0 || p.radius > p.baseRadius + 300) {
                    burstParticles.splice(i, 1);
                }
            }
        }

        function handleClick() {
            emitBurst(80);
        }

        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('touchstart', handleClick);

        let animationFrameId: number;

        function animate() {
            ctx.fillStyle = getColorCssVarWithAlpha('--bg', 0.2);
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawSun();
            drawParticles();
            drawBurstParticles();

            sun.pulse += 0.01;
            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            sun.x = canvas.width / 2;
            sun.y = canvas.height / 2;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('click', handleClick);
            canvas.removeEventListener('touchstart', handleClick);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed left-0 top-0 h-dvh w-dvw" />;
};

export default DayParticleCanvas;
