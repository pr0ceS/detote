import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const ProductPage = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleSwipe = (delta) => {
    if (delta > 0) {
      // Swipe right (previous image)
      setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
      // Swipe left (next image)
      setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
  });

  return (
    <div className="singlep-main-image">
      <img
        src={images[selectedImage]}
        width="600"
        height="auto"
        decoding="async"
        loading="lazy"
        alt="Product image"
        {...handlers}
      />
      <div className="image-thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            decoding="async"
            loading="lazy"
            alt="Product clickable small image"
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
