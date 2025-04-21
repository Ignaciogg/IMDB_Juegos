import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Game } from "../types";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import styles from "../assets/css/GameCard.module.css";
import notFoundImage from "../assets/images/not-found.jpg";

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState<boolean>(false); 

  // Handle click to navigate to the game details page
  const handleClick = () => {
    navigate(`/game/${game.id}`);
  };

 
  const fallbackImage = notFoundImage; 

  return (
    <div className={`${styles.card} ${styles[theme]}`} onClick={handleClick}>
      <img
        className={styles.gameImage}
        src={imageError || !game.image ? fallbackImage : game.image}
        alt={game.name}
        onError={() => setImageError(true)} 
      />
      <div className={styles.gameContent}>
        <h3 className={styles.gameTitle}>{game.name}</h3>
        <div className={styles.ratingContainer}>
          <FaStar color="#ffc107" />
          <span className={styles.rating}>{game.average_rating.toFixed(1)}</span>
          <span className={styles.totalRatings}>({game.totalRatings})</span>
        </div>
        <div className={styles.categories}>
          {game.categories.map((category, index) => (
            <span key={index} className={`${styles.category} ${styles[theme]}`}>
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;