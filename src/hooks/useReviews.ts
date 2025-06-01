import { useEffect, useState } from "react";
import { Review } from "../components/ReviewsList";
import { fetchReviewsByGameId } from "../services/gameService";

export const useReviews = (gameId: string | undefined) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameId) {
      setError("No game ID provided.");
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedReviews = await fetchReviewsByGameId(gameId);
        setReviews(fetchedReviews);
      } catch (e) {
        console.error(e);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [gameId]);

  return { reviews, loading, error };
};