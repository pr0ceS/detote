import { useState, useEffect } from 'react';

const CurrentlyViewingBanner = () => {
  const [currentlyViewing, setCurrentlyViewing] = useState(getRandomNumber(5, 60));

  useEffect(() => {
    const interval = setInterval(() => {
      const changeValue = getRandomNumber(-2, 3);

      const newValue = Math.min(Math.max(currentlyViewing + changeValue, 0), 200);
      setCurrentlyViewing(newValue);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentlyViewing]);

  return (
    <>
      <img
        src="/svg/eye.svg"
        width="14"
        height="auto"
        decoding="async"
        loading="lazy"
        alt="Eye icon"
      />{currentlyViewing} people are currently looking at this product
    </>
  );
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default CurrentlyViewingBanner;
