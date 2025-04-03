import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase"; // Import Firebase Storage
import { FaStar } from "react-icons/fa";
import { Game } from "../types";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import styles from "../assets/css/GameCard.module.css";

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { theme } = useTheme();
  const imageUrl = game.image;

  const navigate = useNavigate();  
 

  //Para coger la imagen de firebase.storage. temporalmente usaremos imagenes locales para estilar.
//const [imageUrl, setImageUrl] = useState(""); 
 /* useEffect(() => {
    const fetchImage = async () => {
      if (!game.image) return;

      try {
        const imageRef = ref(storage, `games/${game.image}`); //permisos firebase va a fallar
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [game.image]); */

  const handleClick = () => {
    navigate(`/game/${game.id}`);  
  };

  return (
    <div className={`${styles.card} ${styles[theme]}`} onClick={handleClick}>
      <img className={styles.gameImage} src={imageUrl} alt={game.name} />
      <div className={styles.gameContent}>
        <h3 className={styles.gameTitle}>{game.name}</h3>
        <div className={styles.ratingContainer}>
          <FaStar color="#ffc107" />
          <span className={styles.rating}>{game.rating.toFixed(1)}</span>
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
