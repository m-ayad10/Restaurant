import React, { useState } from 'react'
import './Star.css'

const StarRating = ({big,setRating,rating}) => {
    const [hover, setHover] = useState(0);
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className={`${big?"star star-icon star-big":"star star-icon star-small"}`} >&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

export default StarRating
