import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 
import GameCard from "./GameCard";
import { Game } from "../types";
import styles from "../assets/css/GameList.module.css"; 
const GameList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesCollection = collection(db, "games");
        const gamesSnapshot = await getDocs(gamesCollection);
        const gamesList: Game[] = gamesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Game[];

        setGames(gamesList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching games:", err);
        setError("Failed to load games. Please try again later.");
        setLoading(false);
      }
    };

    fetchGames();
  }, []); 

  if (loading) {
    return <div className={styles.loading}>Loading games...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.gameList}>
      {games.length === 0 ? (
        <p>No games found.</p>
      ) : (
        games.map((game) => <GameCard key={game.id} game={game} />)
      )}
    </div>
  );
};

export default GameList;