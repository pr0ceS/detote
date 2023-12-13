
const SmallReview = ({ reviewCount, reviewAverage }) => {
  const renderStars = () => {
    const stars = [];
    const totalStars = 5;

    // Calculate the number of full stars
    const fullStars = Math.floor(reviewAverage);
    
    // Check if there is a remainder to determine if a half-star is needed
    const hasHalfStar = reviewAverage % 1 !== 0;

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} type="full" />);
    }

    // Render half-star if needed
    if (hasHalfStar) {
      stars.push(<Star key="half" type="half" />);
    }

    // Render empty stars to complete the total
    for (let i = stars.length; i < totalStars; i++) {
      stars.push(<Star key={i} type="empty" />);
    }

    return stars;
  };

  return (
		<div className={`star-rating star-rating-review ${reviewAverage && reviewCount && "display-star-rating"}`}>{renderStars()} {`(${reviewCount})`}</div>
  );
};

const Star = ({ type }) => {
  const isFull = type === 'full';
  const isHalf = type === 'half';
  const color = isFull ? '#ffbb00' : isHalf ? '#ffbb00' : '#ccc'; /* Gold for full, Grey for empty */

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

export default SmallReview;
