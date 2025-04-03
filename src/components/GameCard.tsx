import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { fetchBGGGame } from "../data/api";
import styles from "../assets/css/GameCard.module.css";

// Define a Game interface for better type safety
interface Game {
  id: number;
  name: string;
  image: string;
  rating: number;
  totalRatings: number;
  categories: string[];
}

interface GameCardProps {
  gameId: number;
}

const GameCard: React.FC<GameCardProps> = ({ gameId }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // New error state

  useEffect(() => {
    async function loadGame() {
      try {
        setLoading(true);
        const data = await fetchBGGGame(gameId);
        setGame(data);
      } catch (error) {
        console.error("Error fetching game:", error);
        setError("Error loading game data."); // Set error message
      } finally {
        setLoading(false);
      }
    }
    loadGame();
  }, [gameId]);

  // Handle loading, error, and displaying the game
  if (loading) return <div>Loading game...</div>;
  if (error) return <div>{error}</div>;
  if (!game) return <div>Game not found.</div>;

  return (
    <div className={`${styles.card} ${styles[theme]}`} onClick={() => navigate(`/game/${game.id}`)}>
      <img className={styles.gameImage} src={game.image} alt={game.name} />
      <div className={styles.gameContent}>
        <h3 className={styles.gameTitle}>{game.name}</h3>
        <div className={styles.ratingContainer}>
          <FaStar color="#ffc107" />
          <span className={styles.rating}>{game.rating.toFixed(1)}</span>
          <span className={styles.totalRatings}>({game.totalRatings})</span>
        </div>
        <div className={styles.categories}>
          {game.categories.length > 0 ? (
            game.categories.map((category, index) => (
              <span key={index} className={`${styles.category} ${styles[theme]}`}>
                {category}
              </span>
            ))
          ) : (
            <span className={`${styles.category} ${styles[theme]}`}>No categories available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
