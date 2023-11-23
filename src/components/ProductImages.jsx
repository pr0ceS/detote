import { useState } from 'react';

const ProductPage = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="singlep-main-image">
      <img
        src={selectedImage}
        width="600"
        height="auto"
        decoding="async"
        loading="lazy"
        alt="Product image"
      />
      <div className="image-thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            decoding="async"
            loading="lazy"
            alt="Product clickable small image"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
