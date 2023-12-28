import { useState, useEffect } from "react";
import AddToCart from "./AddToCart";
import Price from "./Price";

const AddToCartPopup = ({ product }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowWidth = window.innerWidth;

      // Adjust these values based on your requirements
      const maxShowThresholdSmallScreen = 1400;
      const maxShowThresholdLargeScreen = 800;
      const hideThresholdToBottom = 300; // Adjust this value

      const showThreshold = windowWidth < 1000 ? maxShowThresholdSmallScreen : maxShowThresholdLargeScreen;
      const distanceToBottom = document.body.offsetHeight - (scrollY + window.innerHeight);

      // Show the popup when scrolling down and below the showThreshold
      // Hide the popup when close to the bottom
      setShowPopup(scrollY > showThreshold && distanceToBottom > hideThresholdToBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`addtocart-popup ${showPopup ? 'addtocart-popup-show' : ''}`}>
      <div className="addtocart-popup-wrapper">
        <div className="addtocart-popup-text">
          <h3>{product.name}</h3>
          <div className="addtocart-popup-prices">
            <p className="oldprice">was <b><Price price={product.oldPrice} /></b></p>
            <p className="price"><Price price={product.price} /></p>
          </div>
        </div>
        <div className="addtocart-popup-button">
          <AddToCart product={product} small={false} />
          <p>Koop er 2 en claim je gratis cadeau! 🎁</p>
        </div>
      </div>
    </div>
  );
}

export default AddToCartPopup;
