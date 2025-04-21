import { motion } from 'framer-motion';
import Rocket from './rocket';

const RocketScene = () => {
  return (
    <div className="fixed">
      <motion.div
        initial={{ y: 0 }} // Initial position and rotation
        animate={{
          y: [0, -50, 0], // Make it float up and down
        }}
        transition={{
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }, // Floating animation
        }}
      >
        <Rocket />
      </motion.div>
    </div>
  );
};

export default RocketScene;
