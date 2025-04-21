import React from "react";
import { Game } from "../types";
import { useTheme } from "../context/ThemeContext";
import styles from "../assets/css/GamePage.module.css";
import notFoundImage from "../assets/images/not-found.jpg";

interface GameDetailsProps {
  game: Game;
}

const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.gameContainer} ${styles[theme]}`}>
      <h1 className={styles.gameTitle}>{game.name}</h1>
      <img
        src={game.image || notFoundImage} 
        alt={game.name}
        className={styles.gameImage}
      />
      <div className={styles.gameDetails}>
        <p>{game.description}</p>
        <p className={styles.rating}>⭐ {game.average_rating.toFixed(1)}</p>
        <p>
          Players: {game.min_players} - {game.max_players}
        </p>
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

export default GameDetails;