import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useGame } from "../hooks/useGame";
import GameDetails from "../components/GameDetails";
import ReviewsList, { Review } from "../components/ReviewsList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const GamePage: React.FC = () => {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const { game, loading, error } = useGame(id);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      setReviewsLoading(true);
      setReviewsError(null);

      try {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, where("game", "==", id));
        const snapshot = await getDocs(q);

        const fetched: Review[] = snapshot.docs
          .map((doc) => {
            const data = doc.data() as any;
            if (!data.username || !data.reviewText) return null;
            return {
              id: doc.id,
              username: data.username,
              reviewText: data.reviewText,
              rating: Number(data.rating ?? 0),
            };
          })
          .filter((r): r is Review => r !== null);

        setReviews(fetched);
      } catch (e) {
        console.error(e);
        setReviewsError("Failed to load reviews.");
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading game..." />;
  if (error || !game) return <ErrorMessage message={error || "Game not found!"} />;

  return (
    <div className={`game-page ${theme}`}>
      <GameDetails game={game} />
      <ReviewsList
        reviews={reviews}
        isLoading={reviewsLoading}
        error={reviewsError}
      />
    </div>
  );
};

export default GamePage;
