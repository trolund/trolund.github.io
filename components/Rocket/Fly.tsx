import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import Rocket from './rocket';

const Fly = () => {
  const controls = useAnimation();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const moveToRandom = async () => {
      while (true) {
        const newX = Math.random() * window.innerWidth - window.innerWidth / 2;
        const newY = Math.random() * window.innerHeight - window.innerHeight / 2;

        // Calculate angle (atan2 gives degrees from X axis)
        const dx = newX - position.x;
        const dy = newY - position.y;
        const angleRad = Math.atan2(dy, dx);
        const angleDeg = angleRad * (180 / Math.PI);

        // Correct for rocket pointing "up" by default
        const correctedAngle = angleDeg + 90;
        setRotation(correctedAngle);

        // Animate both position and rotation smoothly
        await controls.start({
          x: newX,
          y: newY,
          rotate: correctedAngle,
          transition: {
            duration: 3,
            ease: 'easeInOut',
          },
        });

        setPosition({ x: newX, y: newY });

        await new Promise((resolve) => setTimeout(resolve, 500)); // pause before next move
      }
    };

    moveToRandom();
  }, [controls, position]);

  return (
    <motion.div
      animate={controls}
      initial={{ x: 0, y: 0, rotate: 90 }} // 90° because tip faces "up"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transformOrigin: '50% 50%',
      }}
    >
      <Rocket />
    </motion.div>
  );
};

export default Fly;
