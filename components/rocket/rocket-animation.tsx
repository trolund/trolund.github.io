import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Rocket from './rocket';

const RocketPathAnimation = () => {
  const controls = useAnimation();

  // Settings
  const centerX = 400;
  const centerY = 300;
  const radius = 200;
  const totalSteps = 20; // resolution
  let loop = 1;
  const stepRef = useRef(0); // keeps track of current step

  const calculateNextPoint = (step: number) => {
    const angleRad = step * ((2 * Math.PI) / totalSteps);
    const x = centerX + radius * Math.cos(angleRad);
    const y = centerY + radius * Math.sin(angleRad);
    const angleDeg = angleRad * (180 / Math.PI);
    return { x, y, rotate: angleDeg + 180 };
  };

  const followPath = async () => {
    const target = calculateNextPoint(stepRef.current);

    await controls.start({
      x: target.x,
      y: target.y,
      rotate: target.rotate,
      transition: { duration: 2, ease: 'linear' },
    });

    stepRef.current = stepRef.current + 1;
    console.log('stepRef.current', stepRef.current);
    followPath(); // recursion to loop continuously
  };

  useEffect(() => {
    followPath();
  }, []);

  const initial = calculateNextPoint(0);

  return (
    <div
      className="z-30"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'fixed',
        cursor: 'crosshair',
      }}
    >
      <motion.div
        animate={controls}
        initial={{ x: initial.x, y: initial.y, rotate: initial.rotate }}
        style={{ position: 'absolute' }}
      >
        <Rocket />
      </motion.div>
    </div>
  );
};

export default RocketPathAnimation;
