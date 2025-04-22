import React, { useEffect, useState } from 'react';

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative h-64 w-64 rounded-full border-8 border-gray-700 bg-gray-800 shadow-2xl">
        {/* Center Dot */}
        <div className="absolute left-1/2 top-1/2 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>

        {/* Hour Hand */}
        <div
          className="absolute left-1/2 top-1/2 h-20 w-2 origin-bottom -translate-x-1/2 -translate-y-full rounded bg-white"
          style={{ transform: `translate(-50%, -100%) rotate(${hourDeg}deg)` }}
        ></div>

        {/* Minute Hand */}
        <div
          className="absolute left-1/2 top-1/2 h-28 w-1.5 origin-bottom -translate-x-1/2 -translate-y-full rounded bg-blue-400"
          style={{ transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)` }}
        ></div>

        {/* Second Hand */}
        <div
          className="absolute left-1/2 top-1/2 h-32 w-1 origin-bottom -translate-x-1/2 -translate-y-full rounded bg-red-500"
          style={{ transform: `translate(-50%, -100%) rotate(${secondDeg}deg)` }}
        ></div>
      </div>
    </div>
  );
};

export default AnalogClock;
