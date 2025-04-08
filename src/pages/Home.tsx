import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore database
import styles from "../assets/css/Home.module.css";
import GameSlider from "../components/GameSlider";
import { Game } from "../types";
import { useTheme } from "../context/ThemeContext";

const Home: React.FC = () => {
  const { theme } = useTheme();
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

       
        const sortedGames = gamesList.sort((a, b) => b.average_rating - a.average_rating);
        setGames(sortedGames);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching games:", err);
        setError("Failed to load games. Please try again later.");
        setLoading(false);
      }
    };

    fetchGames();
  }, []); // Empty dependency array to run once on mount

  if (loading) {
    return <div className={`${styles.homeContainer} ${styles[theme]}`}>Loading games...</div>;
  }

  if (error) {
    return <div className={`${styles.homeContainer} ${styles[theme]}`}>{error}</div>;
  }

  return (
    <div className={`${styles.homeContainer} ${styles[theme]}`}>
      <section className={`${styles.heroSection} ${styles[theme]}`}>
        <h1>Descubre los mejores juegos de mesa</h1>
        <p>Tu plataforma para encontrar, valorar y compartir juegos de mesa</p>
      </section>

      <GameSlider title="Juegos populares" games={games} />
    </div>
  );
};

export default Home;