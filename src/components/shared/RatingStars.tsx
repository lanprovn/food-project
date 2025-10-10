import React from 'react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const starSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <i
        key={i}
        className={`fas fa-star text-yellow-400 ${starSizeClasses[size]}`}
      />
    );
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      <i
        key="half"
        className={`fas fa-star-half-alt text-yellow-400 ${starSizeClasses[size]}`}
      />
    );
  }

  // Empty stars
  const emptyStars = maxRating - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <i
        key={`empty-${i}`}
        className={`far fa-star text-gray-300 ${starSizeClasses[size]}`}
      />
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center mr-2">
        {stars}
      </div>
      {showNumber && (
        <span className={`text-gray-600 font-medium ${sizeClasses[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
