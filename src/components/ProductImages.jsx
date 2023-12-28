import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, Pagination, A11y } from 'swiper/modules';
import { register } from 'swiper/element/bundle';

// Install Swiper modules
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const ProductPage = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="product-page-container fadeIn">
      <div className="singlep-main-image">
        <Swiper
          modules={[Thumbs, FreeMode, Pagination, A11y, Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className='main-image'
                src={image}
                width="600"
                height="auto"
                alt={`Product image ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
          
        <div className='image-thumbnails'>
          <Swiper 
            onSwiper={setThumbsSwiper}
            slidesPerView={3}
            spaceBetween={10}
            breakpoints={{
              768: {
                slidesPerView: 5,
                spaceBetween: 0
              },
            }}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
          >
            {images.map((image, index) => (
            <SwiperSlide className='image-thumbnail' key={index}>              
              <img
                src={image}
                width="100"
                height="100"
                decoding="async"
                loading="lazy"
                alt={`Product clickable small image ${index + 1}`}
              />
            </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;
