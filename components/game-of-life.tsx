'use client';

import { useEffect, useRef } from 'react';

const WIDTH = 35;
const HEIGHT = 20;
const SIZE = WIDTH * HEIGHT;
const SCALE = 50;

export default function GameOfLife() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let intervalId: any;
    let memory: WebAssembly.Memory;
    let tick: (ptr: number, width: number, height: number) => void;
    let buffer: Uint8Array;

    const init = async () => {
      const wasmResponse = await fetch('/wasm/release.wasm');
      const wasmBytes = await wasmResponse.arrayBuffer();
      const wasmModule = await WebAssembly.instantiate(wasmBytes, {});
      const exports = wasmModule.instance.exports as any;

      memory = exports.memory;
      tick = exports.tick;

      // Ensure memory is large enough
      const requiredPages = Math.ceil((SIZE * 2) / (64 * 1024));
      const currentPages = memory.buffer.byteLength / 65536;
      if (requiredPages > currentPages) {
        (memory as WebAssembly.Memory).grow(requiredPages - currentPages);
      }

      buffer = new Uint8Array(memory.buffer, 0, SIZE * 2);

      // Initialize the grid
      for (let i = 0; i < SIZE; i++) {
        buffer[i] = Math.random() > 0.8 ? 1 : 0;
      }

      intervalId = setInterval(() => {
        tick(0, WIDTH, HEIGHT);
        draw();
      }, 1000 / 10); // 10 FPS
    };

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = `rgba(255, 255, 255, 0.2)`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
          const i = y * WIDTH + x;
          if (buffer[i]) {
            ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
          }
        }
      }
    };

    init();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <canvas className="bg- fixed" ref={canvasRef} width={WIDTH * SCALE} height={HEIGHT * SCALE} />
  );
}
