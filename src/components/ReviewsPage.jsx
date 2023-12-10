import { useCallback, useState } from "react";
import moment from 'moment';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { urlString } from "../utils/api";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const remainder = totalStars - rating;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} type="full" />);
    }

    for (let i = 0; i < remainder; i++) {
      stars.push(<Star key={fullStars + i} type="empty" />);
    }

    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

const ReviewForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    stars: 0,
    title: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRatingChange = (stars) => {
    setFormData((prevData) => ({ ...prevData, stars }));
  };

  const handleSubmit = () => {
    // You can add validation logic here before submitting
    onSubmit(formData);
  };

  return (
    <div className="review-form-container">
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Star Rating:
        <StarForm onRatingChange={handleRatingChange} />
      </label>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label className="textarea">
        Message:
        <textarea name="message" value={formData.message} onChange={handleChange} />
      </label>
      <button className="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const StarForm = ({ onRatingChange }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarClick = (selectedStar) => {
    setSelectedStars(selectedStar);
    onRatingChange(selectedStar);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const starClassName = i <= selectedStars ? 'starSelect selected' : 'starSelect';

      stars.push(
        <span key={i} className={starClassName} onClick={() => handleStarClick(i)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill={i <= selectedStars ? '#ffbb00' : '#ccc'}
            className={`starSelect`}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2L14.489 8.12L21 9.12L16 14.12L17.489 21L12 17.5L6.511 21L8 14.12L3 9.12L9.511 8.12L12 2z" />
          </svg>
        </span>
      );
    }

    return stars;
  };

  return <div className="star-form">{renderStars()}</div>;
};

const Star = ({ type }) => {
  const isFull = type === 'full';
  const color = isFull ? '#ffbb00' : '#ccc'; /* Gold for full, Grey for empty */

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={color}
      className={`star ${type}`}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2L14.489 8.12L21 9.12L16 14.12L17.489 21L12 17.5L6.511 21L8 14.12L3 9.12L9.511 8.12L12 2z" />
    </svg>
  );
};

const generateHypotheticalReviews = () => {
  const totalReviews = 1173;
  const fiveStarCount = Math.ceil((totalReviews * 80) / 100);
  const fourStarCount = Math.ceil((totalReviews * 12) / 100);
  const threeStarCount = Math.ceil((totalReviews * 8) / 100);

  const reviews = [];

  for (let i = 0; i < fiveStarCount; i++) {
    reviews.push({
      stars: 5,
      name: `Anonymous`,
      title: 'Thank you!',
      message: 'Great product',
      date: moment().subtract(i, 'days').toISOString(),
    });
  }

  for (let i = 0; i < fourStarCount; i++) {
    reviews.push({
      stars: 4,
      name: `User${fiveStarCount + i + 1}`,
      title: 'Good Product',
      message: 'I need more than 12 card slots, furthermore good wallet',
      date: moment().subtract(fiveStarCount + i, 'days').toISOString(),
    });
  }

  for (let i = 0; i < threeStarCount; i++) {
    reviews.push({
      stars: 3,
      name: `User${fiveStarCount + fourStarCount + i + 1}`,
      title: 'Only 12 card slots',
      message: 'I personally need more than 12 card slots. Therefore I give it 3 stars.',
      date: moment().subtract(fiveStarCount + fourStarCount + i, 'days').toISOString(),
    });
  }

  return reviews;
};

// Usage in ReviewsPage component
const hypotheticalReviews = generateHypotheticalReviews();

const ReviewsPage = ({ url, reviews }) => {
  const totalStars = 5;
  
  const [displayedReviews, setDisplayedReviews] = useState(hypotheticalReviews.slice(0, 5));
  const [loadMoreVisible, setLoadMoreVisible] = useState(hypotheticalReviews.length > 5);

  const loadMoreReviews = useCallback(() => {
    const remainingReviews = reviews.slice(displayedReviews.length, displayedReviews.length + 5);
    const newDisplayedReviews = [...displayedReviews, ...remainingReviews];
    setDisplayedReviews(newDisplayedReviews);

    if (newDisplayedReviews.length >= reviews.length) {
      setLoadMoreVisible(false);
    }
  }, [reviews, displayedReviews]);

  // Calculate overall rating average
  const overallRating = reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;

  // Calculate percentage of customers who recommend the product (rated 3 or more stars)
  const recommendPercentage =
    (reviews.filter((review) => review.stars >= 3).length / reviews.length) * 100;

  const starCounts = Array.from({ length: totalStars }, (_, index) =>
    reviews.filter((review) => review.stars === totalStars - index).length
  );
  
  // Calculate the total number of reviews
  const totalReviews = reviews.length;

  const [isReviewFormOpen, setReviewFormOpen] = useState(false);

  const openReviewForm = () => {
    setReviewFormOpen(!isReviewFormOpen);
  };

  const handleReviewSubmit = async (reviewData) => {
    // You can perform the POST request here using fetch or your preferred method
    // For simplicity, this example just logs the review data
    const existingObject = await reviewData;
    const updatedObject = await { ...existingObject, url: url };
    try {
      const res = await fetch(`${urlString}/products/review`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedObject)
      });
      
      const data = await res.json();
      if(data.success) {
        Toastify({
          text: `Review posted`,
          duration: 3000,
          close: true,
          gravity: "bottom",
          position: "right",
          style: {
            background: "#02aa2c",
          }
        }).showToast();
      } else {
        Toastify({
          text: `${data.message}`,
          duration: 3000,
          close: true,
          gravity: "bottom",
          position: "right",
          style: {
            background: "#dc2626",
          }
        }).showToast();
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
		<div className="reviews">
			<div className="reviews-container">
				<h2>Customer Reviews {`(${reviews.length})`}</h2>
        <section>
          <div className="customer-reviews">
            {displayedReviews.map((review, index) => (
              <div key={index} className="review">
                <svg width="45" height="45" viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="xxlarge"> <g> <circle cx="64" cy="64" r="64" fill="#8993a4" /> <g> <path fill="#fff" d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" /> <path fill="#fff" d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" /> </g> </g> </svg>
                <div className="customer-text">
                  <div className="customer-top">
                    <div>
                      <h3>{review.name}</h3>
                      <p className="verified-purchase">
                        <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 305.002 305.002" xmlSpace="preserve"> <g> <g> <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5 S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5 c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"/> <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678 l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385 c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"/> </g> </g> </svg>
                        Verified purchase
                      </p>
                    </div>
                    <p>{moment(review.date).format('DD MMMM YYYY')}</p>
                  </div>
                  <div className="customer-middle">
                    <div>
                      <StarRating rating={review.stars} />
                      <p>{review.title}</p>
                    </div>
                    <p>{review.message}</p>
                  </div>
                </div>
              </div>
            ))}
            {loadMoreVisible && (
              <button className="button" onClick={loadMoreReviews}>Load More</button>
            )}
          </div>
          <div className="overall-rating">
            <h3>Overall rating</h3>
            <div className="overall-rating-top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="#ffbb00"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2L14.489 8.12L21 9.12L16 14.12L17.489 21L12 17.5L6.511 21L8 14.12L3 9.12L9.511 8.12L12 2z" />
              </svg>
              <h2>{overallRating.toFixed(1)}</h2>
              <div>
                <b><p>{`${reviews.filter((review) => review.stars >= 3).length} out of ${reviews.length} (${Math.floor(recommendPercentage)}%)`}</p></b>
                <p>Customers recommend this product</p>
              </div>
            </div>
            <div className="overall-rating-middle">
              <div className="star-rating-bars">
                {[5, 4, 3, 2, 1].map((starCount, index) => {
                  const percentage = (starCounts[totalStars - starCount] / totalReviews) * 100 || 0;
                  
                  return (
                    <div key={index} className="star-rating-bar">
                      <span className="star-rating-label">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="#ffbb00"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 2L14.489 8.12L21 9.12L16 14.12L17.489 21L12 17.5L6.511 21L8 14.12L3 9.12L9.511 8.12L12 2z" />
                        </svg>
                        {starCount}
                      </span>
                      <div className="star-rating-progress" style={{ width: '80%' }}>
                        <div className="star-rating-progress-filled" style={{ width: `${percentage}%`, backgroundColor: percentage > 0 ? '#ffbb00' : '#ccc' }}></div>
                      </div>
                      {<span className="starcounts">{`${starCounts[totalStars - starCount]}`}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="overall-rating-write">
              <div className="overall-rating-text">
                <div>
                  <p>Review this product</p>
                  <p>Share your experience with other customers</p>
                </div>
                <button className="button" onClick={() => openReviewForm()}>Write a review</button>
              </div>
              <div className="review-form">
                {isReviewFormOpen && (
                  <ReviewForm onSubmit={handleReviewSubmit} />
                )}
              </div>
            </div>
          </div>
        </section>
			</div>
		</div>
  );
};

export default ReviewsPage