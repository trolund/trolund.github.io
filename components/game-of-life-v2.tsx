'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useTheme } from '../hooks/ThemeContext';

const TILE_SIZE = 50;
const WIDTH = Math.floor(800 / TILE_SIZE);
const HEIGHT = Math.floor(700 / TILE_SIZE);
const SIZE = WIDTH * HEIGHT;
const FPS = 1000 / 15;

type tickFunction = (offset: number, width: number, height: number) => boolean;

function getEdgeProximityValue(x: number, y: number, width: number, height: number): number {
  const centerX = (width - 1) / 2;
  const centerY = (height - 1) / 2;

  const dx = x - centerX;
  const dy = y - centerY;

  const distance = Math.sqrt(dx * dx + dy * dy);
  const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

  const normalized = 1 - distance / maxDistance; // 1 in center, 0 on corners

  const minVal = 0.000000001;
  const maxVal = 0.5;

  return minVal + normalized * (maxVal - minVal) - 0.15;
}

export default function GameOfLifeV2() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scale = 20;
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const sizeRef = useRef(0);
  const bufferRef = useRef<Uint8Array>();
  const intervalIdRef = useRef<any>();
  const tickRef = useRef<tickFunction>();

  const { isDark } = useTheme();

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

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const i = y * WIDTH + x;
        if (buffer[i]) {
          // Get edge proximity value
          const proximity = getEdgeProximityValue(x, y, WIDTH, HEIGHT);

          const root = document.documentElement;
          const colorVar = isDark ? '--surface-3' : '--surface-3';
          const hex = getComputedStyle(root).getPropertyValue(colorVar).trim();

          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);

          offCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${proximity})`;
          offCtx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }

    // Clear main canvas and draw the fully rendered frame in one go
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreen, 0, 0);
  }, [isDark]);

  useEffect(() => {
    const setupCanvas = (buffer: Uint8Array, SIZE: number) => {
      for (let i = 0; i < SIZE; i++) {
        buffer[i] = Math.random() > 0.5 ? 1 : 0;
      }
    };

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
      const wasmModule = await WebAssembly.instantiate(wasmBytes, {
        env: {
          abort(msgPtr: number, filePtr: number, line: number, column: number) {
            console.error('abort called at', line + ':' + column);
            // optionally read the message string from memory if needed
          },
        },
      });
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
      setupCanvas(buffer, SIZE);
    };
    init();
  }, [draw]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      var done = tickRef.current?.(0, WIDTH, HEIGHT);

      if (done) {
        intervalIdRef.current = undefined;
        clearInterval(intervalId);
      } else {
        draw();
      }
    }, FPS);

    intervalIdRef.current = intervalId;

    return () => {
      clearInterval(intervalId);
      intervalIdRef.current = undefined;
    };
  }, [draw]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] md:h-[700px] md:w-[700px]"
      />
    </div>
  );
}
