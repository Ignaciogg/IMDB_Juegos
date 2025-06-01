import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useGame } from "../hooks/useGame";
import { useReviews } from "../hooks/useReviews";
import { useAuth } from "../hooks/useAuth";
import GameDetails from "../components/GameDetails";
import ReviewsList from "../components/ReviewsList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { navigateToReview } from "../utils/navigation";

const GamePage: React.FC = () => {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuth();
  const { game, loading: gameLoading, error: gameError } = useGame(id);
  const { reviews, loading: reviewsLoading, error: reviewsError } = useReviews(id);

  const handleGiveReview = () => {
    if (id) {
      navigateToReview(user, id, navigate);
    }
  };

  const isLoading = gameLoading || reviewsLoading;
  const error = gameError || (!game && "Game not found!");

  if (isLoading) return <LoadingSpinner message="Loading game and reviews..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={`game-page ${theme}`}>
      <GameDetails game={game!} /> {/* Use non-null assertion since we know game exists */}
      <button onClick={handleGiveReview}>Give Your Review</button>
      <ReviewsList
        reviews={reviews}
        isLoading={false}
        error={reviewsError}
      />
    </div>
  );
};

export default GamePage;