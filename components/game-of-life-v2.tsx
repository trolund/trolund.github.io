'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../hooks/ThemeContext';

const WIDTH = Math.floor(250 / 20);
const HEIGHT = Math.floor(250 / 20);
const SIZE = WIDTH * HEIGHT;
// frame rate: 1000ms / 60fps = 16.67ms
const FPS = 1000 / 25;

export default function GameOfLifeV2() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scale = 20;
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const sizeRef = useRef(0);
  const bufferRef = useRef<Uint8Array>();
  const intervalIdRef = useRef<any>();
  const tickRef = useRef<(offset: number, width: number, height: number) => void>();

  const { isDark } = useTheme();

  // Separate draw function so it can re-render on theme changes
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const WIDTH = widthRef.current;
    const HEIGHT = heightRef.current;
    const buffer = bufferRef.current;
    if (!canvas || !buffer) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create off-screen canvas
    const offscreen = document.createElement('canvas');
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    offCtx.fillStyle = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const i = y * WIDTH + x;
        if (buffer[i]) {
          offCtx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }

    // Clear main canvas and draw the fully rendered frame in one go
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreen, 0, 0);
  }, [isDark]);

  useEffect(() => {
    const init = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

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
      tickRef.current = exports.tick;

      const requiredPages = Math.ceil((SIZE * 2) / (64 * 1024));
      const currentPages = memory.buffer.byteLength / 65536;
      if (requiredPages > currentPages) {
        memory.grow(requiredPages - currentPages);
      }

      const buffer = new Uint8Array(memory.buffer, 0, SIZE * 2);
      bufferRef.current = buffer;

      for (let i = 0; i < SIZE; i++) {
        buffer[i] = Math.random() > 0.8 ? 1 : 0;
      }
    };
    init();
  }, [draw]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      tickRef.current?.(0, WIDTH, HEIGHT);
      draw();
    }, FPS);

    intervalIdRef.current = intervalId;

    return () => {
      clearInterval(intervalId);
      intervalIdRef.current = undefined;
    };
  }, [draw]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="m-auto">
        <canvas ref={canvasRef} className="fixed inset-0 block h-[300px] w-[300px]" />
      </div>
    </div>
  );
}
