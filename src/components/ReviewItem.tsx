
import React from "react";
import { useTheme } from "../context/ThemeContext";
import styles from "../assets/css/ReviewsList.module.css"; 

interface ReviewItemProps {
  review: {
    id: string;
    username: string;
    reviewText: string;
    rating: number;
  };
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.reviewItem} ${styles[theme]}`}>
      <span className={styles.username}>{review.username}</span>
      <div className={`${styles.rating} ${styles[theme]}`}>
        {review.rating}/10
      </div>
      <p className={styles.reviewText}>{review.reviewText}</p>
    </div>
  );
};

export default ReviewItem;