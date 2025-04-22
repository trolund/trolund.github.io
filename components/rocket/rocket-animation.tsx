import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Rocket from './rocket';

type RocketPath = {
  x: number;
  y: number;
  rotate: number;
};

const RocketPathAnimation = () => {
  const controls = useAnimation();

  const generateCircularPath = (
    centerX: number,
    centerY: number,
    radius: number,
    steps: number,
  ) => {
    const points: RocketPath[] = [];
    for (let i = 0; i <= steps; i++) {
      const angleRad = (i / steps) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angleRad);
      const y = centerY + radius * Math.sin(angleRad);
      const angleDeg = angleRad * (180 / Math.PI);
      points.push({ x, y, rotate: angleDeg });
    }
    return points;
  };

  const waypoints = generateCircularPath(400, 300, 200, 30);

  console.table(waypoints);

  const followPath = async () => {
    for (let i = 0; i < waypoints.length - 1; i++) {
      const target = waypoints[i];

      await controls.start({
        rotate: target.rotate + 180,
        x: target.x,
        y: target.y,
        transition: { duration: 0.05, ease: 'circInOut' },
      });
    }

    followPath(); // seamless restart
  };

  useEffect(() => {
    followPath();
  }, []);

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
        initial={{ x: waypoints[0].x, y: waypoints[0].y, rotate: 0 }}
        style={{ position: 'absolute' }}
      >
        <Rocket />
      </motion.div>
    </div>
  );
};

export default RocketPathAnimation;
