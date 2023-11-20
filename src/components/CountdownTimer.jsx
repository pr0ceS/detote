import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const initialDuration = 600; // Initial duration in seconds (10 minutes)
  const resetDuration = 300; // Reset duration in seconds (2 minutes)
  const [duration, setDuration] = useState(
    parseInt(sessionStorage.getItem('countdownDuration'), 10) || initialDuration
  );

  const updateDuration = (newDuration) => {
    setDuration(newDuration);
    sessionStorage.setItem('countdownDuration', newDuration.toString());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (duration > 0) {
        updateDuration(duration - 1);
      } else {
        // If duration reaches 0, reset to 2 minutes
        updateDuration(resetDuration);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, resetDuration]);

  // Format seconds to "mm:ss"
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    formatTime(duration)
  );
};

export default CountdownTimer;