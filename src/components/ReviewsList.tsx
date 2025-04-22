// src/components/ReviewsList.tsx
import React from "react";
import { useTheme } from "../context/ThemeContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import ReviewItem from "./ReviewItem"; // Import the new component
import styles from "../assets/css/ReviewsList.module.css";

export interface Review {
  id: string;
  username: string;
  reviewText: string;
  rating: number;
}

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews, isLoading, error }) => {
  const { theme } = useTheme();

  if (isLoading) return <LoadingSpinner message="Loading reviews..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={`${styles.reviewsContainer} ${styles[theme]}`}>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to write one!</p>
      ) : (
        reviews.map((r) => <ReviewItem key={r.id} review={r} />)
      )}
    </div>
  );
};

export default ReviewsList;