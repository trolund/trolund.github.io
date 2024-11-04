import React from 'react';
import { motion } from 'framer-motion';

type GradientSVGProps = {
  speed?: number;
  size?: number;
  hideRight?: boolean;
  hideLeft?: boolean;
  opacity?: number;
};

const GradientSVG = ({ speed, size, hideRight, hideLeft, opacity }: GradientSVGProps) => {
  const animationSpeed: number = speed ?? 0.15;
  const svgSize: number = size ?? 60;
  const growFrom = 0.8;
  const duration = 1.2;
  const zIndex = -1;
  return (
    <>
      {!hideRight && (
        <motion.svg
          viewBox="0 720 400 1"
          xmlns="http://www.w3.org/2000/svg"
          width={`max(${svgSize}vw, ${svgSize}vh)`}
          height={`max(${svgSize}vw, ${svgSize}vh)`}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            opacity: opacity ?? 1,
            zIndex: zIndex,
          }}
        >
          <g transform="translate(500, 500)">
            <motion.path
              d="M0 432.7C-74.1 419.3 -148.1 405.9 -214.5 371.5C-280.9 337.1 -339.6 281.8 -374.7 216.3C-409.8 150.9 -421.2 75.5 -432.7 0L0 0Z"
              fill="var(--surface-0)"
              initial={{ opacity: 0, scale: growFrom }} // Start slightly smaller and transparent
              animate={{ opacity: 1, scale: 1 }} // Pulse in to full size and opacity
              transition={{
                delay: animationSpeed * 7,
                duration: duration,
                ease: 'easeInOut',
              }}
            />

            <motion.path
              d="M0 370.9C-63.5 359.4 -127 347.9 -183.9 318.4C-240.8 289 -291.1 241.5 -321.2 185.4C-351.2 129.4 -361 64.7 -370.9 0L0 0Z"
              fill="var(--surface-1)"
              initial={{ opacity: 0, scale: growFrom }} // Start slightly smaller and transparent
              animate={{ opacity: 1, scale: 1 }} // Pulse in to full size and opacity
              transition={{
                delay: animationSpeed * 6,
                duration: duration,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M0 309C-52.9 299.5 -105.8 289.9 -153.2 265.4C-200.6 240.8 -242.6 201.3 -267.6 154.5C-292.7 107.8 -300.9 53.9 -309 0L0 0Z"
              fill="var(--surface-2)"
              initial={{ opacity: 0, scale: growFrom }} // Start slightly smaller and transparent
              animate={{ opacity: 1, scale: 1 }} // Pulse in to full size and opacity
              transition={{
                delay: animationSpeed * 5,
                duration: duration,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M0 247.2C-42.3 239.6 -84.6 231.9 -122.6 212.3C-160.5 192.7 -194.1 161 -214.1 123.6C-234.2 86.2 -240.7 43.1 -247.2 0L0 0Z"
              fill="var(--surface-3)"
              initial={{ opacity: 0, scale: growFrom }} // Start slightly smaller and transparent
              animate={{ opacity: 1, scale: 1 }} // Pulse in to full size and opacity
              transition={{
                delay: animationSpeed * 4,
                duration: duration,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M0 185.4C-31.7 179.7 -63.5 174 -91.9 159.2C-120.4 144.5 -145.5 120.8 -160.6 92.7C-175.6 64.7 -180.5 32.3 -185.4 0L0 0Z"
              fill="var(--surface-4)"
              initial={{ opacity: 0, scale: growFrom }} // Start slightly smaller and transparent
              animate={{ opacity: 1, scale: 1 }} // Pulse in to full size and opacity
              transition={{
                delay: animationSpeed * 3,
                duration: duration,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M0 123.6C-21.2 119.8 -42.3 116 -61.3 106.1C-80.3 96.3 -97 80.5 -107.1 61.8C-117.1 43.1 -120.3 21.6 -123.6 0L0 0Z"
              fill="var(--surface-5)"
              initial={{ opacity: 0, scale: growFrom }} // Start slightly smaller and transparent
              animate={{ opacity: 1, scale: 1 }} // Pulse in to full size and opacity
              transition={{
                delay: animationSpeed * 2,
                duration: duration,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M0 61.8C-10.6 59.9 -21.2 58 -30.6 53.1C-40.1 48.2 -48.5 40.3 -53.5 30.9C-58.5 21.6 -60.2 10.8 -61.8 0L0 0Z"
              fill="var(--surface-6)"
              initial={{ opacity: 0, scale: growFrom }} // Start slightly smaller and transparent
              animate={{ opacity: 1, scale: 1 }} // Pulse in to full size and opacity
              transition={{
                delay: animationSpeed * 1,
                duration: duration,
                ease: 'easeInOut',
              }}
            />
          </g>
        </motion.svg>
      )}

      {!hideLeft && (
        <motion.svg
          viewBox="100 0 500 400"
          xmlns="http://www.w3.org/2000/svg"
          width={`max(${svgSize}vw, ${svgSize}vh)`}
          height={`max(${svgSize}vw, ${svgSize}vh)`}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            scale: duration,
            opacity: opacity ?? 1,
            zIndex: zIndex,
          }}
        >
          <g transform="translate(50, 550)">
            <motion.path
              d="M0 -432.7C72.5 -416.5 144.9 -400.4 211.5 -366.3C278.1 -332.3 338.8 -280.4 374.7 -216.3C410.6 -152.3 421.6 -76.1 432.7 0L0 0Z"
              fill="var(--surface-0)"
              initial={{ opacity: 0, scale: growFrom }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: animationSpeed * 7,
                duration: duration,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M0 -370.9C62.1 -357.6 124.1 -344.3 181 -315.6C238 -286.9 289.7 -242.7 319.3 -186.1C348.9 -129.4 356.5 -64.7 370.9 0L0 0Z"
              fill="var(--surface-1)"
              initial={{ opacity: 0, scale: growFrom }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: animationSpeed * 6,
                duration: duration,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M0 -309C51.8 -298.7 103.5 -288.5 150.5 -264.7C197.5 -240.8 239.8 -203.1 263.9 -155.8C288 -108.5 294.3 -54.3 309 0L0 0Z"
              fill="var(--surface-2)"
              initial={{ opacity: 0, scale: growFrom }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: animationSpeed * 5,
                duration: duration,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M0 -247.2C41.4 -239.8 82.8 -232.4 120 -213.9C157.2 -195.3 190.9 -165.4 208.5 -125.8C226 -86.2 227.4 -43.1 247.2 0L0 0Z"
              fill="var(--surface-3)"
              initial={{ opacity: 0, scale: growFrom }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: animationSpeed * 4,
                duration: duration,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M0 -185.4C31 -179.8 62 -174.2 90 -163.1C118 -152 143 -135.4 153.1 -95.7C163.1 -56.1 158.7 -28.1 185.4 0L0 0Z"
              fill="var(--surface-4)"
              initial={{ opacity: 0, scale: growFrom }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: animationSpeed * 3,
                duration: duration,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M0 -123.6C20.7 -119.9 41.4 -116.2 60 -108.7C78.5 -101.1 95.2 -89.7 106.2 -63.9C117.1 -38.1 112.4 -19 123.6 0L0 0Z"
              fill="var(--surface-5)"
              initial={{ opacity: 0, scale: growFrom }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: animationSpeed * 2,
                duration: duration,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M0 -61.8C10.3 -59.9 20.7 -58.1 30 -54.3C39.2 -50.5 47.6 -44.9 53.1 -31.9C58.5 -18.9 56.2 -9.5 61.8 0L0 0Z"
              fill="var(--surface-6)"
              initial={{ opacity: 0, scale: growFrom }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: animationSpeed * 1,
                duration: duration,
                ease: 'easeInOut',
              }}
            />
          </g>
        </motion.svg>
      )}
    </>
  );
};

export default GradientSVG;
