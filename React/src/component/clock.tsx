import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the clock every second
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  // Format time as HH:MM:SS
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Format date without the weekday, e.g., "Feb 9, 2025"
  const formattedDate = currentTime.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="w-100  p-0 mb-1 text-green-400 font-mono mx-auto">
      <div className="flex flex-row items-center justify-center space-x-2">
        <div className="text-2xl font-bold">
          {formattedTime}
        </div>
        <div className="text-sm">
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
