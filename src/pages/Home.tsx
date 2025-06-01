import React from "react";
import styles from "../assets/css/Home.module.css";
import GameSlider from "../components/GameSlider";
import LoadingSpinner from "../components/LoadingSpinner"; // Assuming this exists
import ErrorMessage from "../components/ErrorMessage"; // Assuming this exists
import { useTheme } from "../context/ThemeContext";
import { usePopularGames } from "../hooks/usePopularGames";

const Home: React.FC = () => {
  const { theme } = useTheme();
  const { games, loading, error } = usePopularGames();

  if (loading) {
    return (
      <div className={`${styles.homeContainer} ${styles[theme]}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.homeContainer} ${styles[theme]}`}>
        <ErrorMessage message={error} />
      </div>
    );
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