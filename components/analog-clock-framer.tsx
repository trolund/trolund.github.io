import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

const AnalogClockFramer = () => {
  const [time, setTime] = useState(new Date());

  const secondRotate = useMotionValue(0);
  const minuteRotate = useMotionValue(0);
  const hourRotate = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const targetSecond = seconds * 6;
      const targetMinute = minutes * 6 + seconds * 0.1;
      const targetHour = (hours % 12) * 30 + minutes * 0.5;

      animate(secondRotate, targetSecond, { type: 'spring', stiffness: 100, damping: 20 });
      animate(minuteRotate, targetMinute, { type: 'spring', stiffness: 100, damping: 20 });
      animate(hourRotate, targetHour, { type: 'spring', stiffness: 100, damping: 20 });
    };

    update(); // initial
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [secondRotate, minuteRotate, hourRotate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="relative h-64 w-64 rounded-full border-8 border-gray-700 bg-gray-800 shadow-2xl">
        {/* Center Dot */}
        <div className="absolute left-1/2 top-1/2 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />

        {/* Hour Hand */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-20 w-2 origin-bottom -translate-x-1/2 -translate-y-full rounded bg-white"
          style={{ rotate: hourRotate }}
        />

        {/* Minute Hand */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-28 w-1.5 origin-bottom -translate-x-1/2 -translate-y-full rounded bg-blue-400"
          style={{ rotate: minuteRotate }}
        />

        {/* Second Hand */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-32 w-1 origin-bottom -translate-x-1/2 -translate-y-full rounded bg-red-500"
          style={{ rotate: secondRotate }}
        />
      </div>
    </div>
  );
};

export default AnalogClockFramer;
