import React from 'react';
import styles from '../assets/css/Home.module.css'; // Importa el CSS
import { games } from '../data/games';
import GameSlider from '../components/GameSlider';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
  const { theme } = useTheme();
  
  // Ordenar juegos por valoración para mostrar los populares
  const popularGames = [...games].sort((a, b) => b.rating - a.rating);

  return (
    <div className={`${styles.homeContainer} ${styles[theme]}`}>
      <section className={`${styles.heroSection} ${styles[theme]}`}>
        <h1>Descubre los mejores juegos de mesa</h1>
        <p>Tu plataforma para encontrar, valorar y compartir juegos de mesa</p>
      </section>
      
      <GameSlider title="Juegos populares" games={popularGames} />
    </div>
  );
};

export default Home;
