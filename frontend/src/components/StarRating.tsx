import { useState } from 'react';

interface StarRatingProps {
  onRate: (rating: number) => void;
  currentRating?: number;
}

const StarRating = ({ onRate, currentRating = 0 }: StarRatingProps) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(currentRating);

  const handleClick = (value: number) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', margin: '10px 0' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            transition: 'transform 0.2s',
            padding: '0'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ 
            color: star <= (hover || rating) ? '#ffd700' : '#555',
            textShadow: star <= (hover || rating) ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none'
          }}>
            ★
          </span>
        </button>
      ))}
      {rating > 0 && (
        <span style={{ 
          marginLeft: '10px', 
          color: '#ffd700', 
          fontWeight: 'bold',
          fontSize: '18px',
          alignSelf: 'center'
        }}>
          {rating}/10
        </span>
      )}
    </div>
  );
};

export default StarRating;