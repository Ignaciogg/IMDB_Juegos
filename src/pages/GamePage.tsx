import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBGGGame } from "../data/api";
import styles from "../assets/css/GamePage.module.css";
import { useTheme } from "../context/ThemeContext";

const GamePage: React.FC = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const [game, setGame] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGame() {
      if (!id) return;

  
      console.log("Fetching game with ID:", id);

      try {
        const gameData = await fetchBGGGame(parseInt(id));

    
        console.log("Fetched game data:", gameData);

        if (!gameData) {
          console.error("No game data found for ID:", id);
          return;
        }

        setGame(gameData);
      } catch (error) {
        console.error("Error fetching game:", error);
      } finally {
        setLoading(false);
      }
    }
    loadGame();
  }, [id]);

  if (loading) return <div className={`${styles.gameContainer} ${styles[theme]}`}>Loading...</div>;
  if (!game) return <div className={`${styles.gameContainer} ${styles[theme]}`}>Game not found!</div>;

  return (
    <div className={`${styles.gameContainer} ${styles[theme]}`}>
      <h1 className={styles.gameTitle}>{game.name}</h1>
      <img src={game.image} alt={game.name} className={styles.gameImage} />
      <div className={styles.gameDetails}>
        <p>{game.description}</p>
        <p className={styles.rating}>⭐ {game.rating}</p>
        <p>Players: {game.minPlayers} - {game.maxPlayers}</p>
      </div>
    </div>
  );
};

export default GamePage;
