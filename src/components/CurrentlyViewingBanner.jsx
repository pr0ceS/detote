import { useState, useEffect, useRef } from 'react';
import FadeIn from 'react-fade-in';

const CurrentlyViewingBanner = ({ checkout }) => {
  const [currentlyViewing, setCurrentlyViewing] = useState(
    checkout ? getRandomNumber(80, 100) : getRandomNumber(5, 40)
  );
  const fadeRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const changeValue = getRandomNumber(-3, 5);
      const newValue = Math.min(
        Math.max(currentlyViewing + changeValue, 0),
        checkout ? 400 : 200
      );

      // Apply fade-out effect
      fadeRef.current.style.opacity = 0;

      // Wait for the fade-out transition to complete
      setTimeout(() => {
        setCurrentlyViewing(newValue);
        // Apply fade-in effect
        fadeRef.current.style.opacity = 1;
      }, 200); // Adjust the timeout to match your CSS transition duration
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentlyViewing, checkout]);

  return (
    <FadeIn transitionDuration={200}>
      <div className="fade-container" ref={fadeRef}>
        {checkout && (
          <>
            <b>{currentlyViewing} people</b> are checking out now
          </>
        )}
        {!checkout && (
          <>
            {currentlyViewing} people are currently looking at this product
          </>
        )}
      </div>
    </FadeIn>
  );
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default CurrentlyViewingBanner;
