import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Game } from '../types';
import { games } from '../data/games'; 
import styles from "../assets/css/GamePage.module.css";
import { useTheme } from '../context/ThemeContext';

const GamePage: React.FC = () => {
  const { theme } = useTheme();  
  const { id } = useParams(); 
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const foundGame = games.find(game => game.id.toString() === id);
    setGame(foundGame || null); 
  }, [id]);

  if (!game) return <div className={`${styles.gameContainer} ${styles[theme]}`}>Game not found!</div>; 

  return (
    <div className={`${styles.gameContainer} ${styles[theme]}`}>
      <h1 className={styles.gameTitle}>{game.name}</h1>
      <img src={game.image} alt={game.name} className={styles.gameImage} />
      <div className={styles.gameDetails}>
        <p>{game.description}</p>
        <p className={styles.rating}>⭐ {game.rating}</p>
        <p>Players: {game.minPlayers} - {game.maxPlayers}</p>
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

export default GamePage;
