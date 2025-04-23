'use client';

import { useEffect, useRef } from 'react';

export default function GameOfLife() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scale = 20; // px per cell
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const sizeRef = useRef(0);
  const bufferRef = useRef<Uint8Array>();
  const intervalIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const init = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      const WIDTH = Math.floor(canvasWidth / scale);
      const HEIGHT = Math.floor(canvasHeight / scale);
      const SIZE = WIDTH * HEIGHT;

      widthRef.current = WIDTH;
      heightRef.current = HEIGHT;
      sizeRef.current = SIZE;

      canvas.width = WIDTH * scale;
      canvas.height = HEIGHT * scale;

      const wasmResponse = await fetch('/wasm/release.wasm');
      const wasmBytes = await wasmResponse.arrayBuffer();
      const wasmModule = await WebAssembly.instantiate(wasmBytes, {});
      const exports = wasmModule.instance.exports as any;

      const memory: WebAssembly.Memory = exports.memory;
      const tick = exports.tick;

      const requiredPages = Math.ceil((SIZE * 2) / (64 * 1024));
      const currentPages = memory.buffer.byteLength / 65536;
      if (requiredPages > currentPages) {
        memory.grow(requiredPages - currentPages);
      }

      const buffer = new Uint8Array(memory.buffer, 0, SIZE * 2);
      bufferRef.current = buffer;

      // Random init
      for (let i = 0; i < SIZE; i++) {
        buffer[i] = Math.random() > 0.8 ? 1 : 0;
      }

      const draw = () => {
        const ctx = canvas.getContext('2d');
        if (!ctx || !bufferRef.current) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgb(255, 255, 255, 0.1)';

        const WIDTH = widthRef.current;
        const HEIGHT = heightRef.current;
        const buffer = bufferRef.current;

        for (let y = 0; y < HEIGHT; y++) {
          for (let x = 0; x < WIDTH; x++) {
            const i = y * WIDTH + x;
            if (buffer[i]) {
              ctx.fillRect(x * scale, y * scale, scale, scale);
            }
          }
        }
      };

      intervalIdRef.current = setInterval(() => {
        tick(0, WIDTH, HEIGHT);
        draw();
      }, 100);
    };

    init();
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0"
      style={{ display: 'block', width: '100vw', height: '100vh' }}
    />
  );
}
