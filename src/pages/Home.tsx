import React from 'react';
import styles from '../assets/css/Home.module.css'; // Importa el CSS
import { games } from '../data/games';
import GameSlider from '../components/GameSlider';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
  const { theme } = useTheme();
  const gameIds = [13, 174430, 161936,12,25,122,23] // ids de prueba
 
  return (
    <div className={`${styles.homeContainer} ${styles[theme]}`}>
      <section className={`${styles.heroSection} ${styles[theme]}`}>
        <h1>Descubre los mejores juegos de mesa</h1>
        <p>Tu plataforma para encontrar, valorar y compartir juegos de mesa</p>
      </section>
      
      <GameSlider title="Juegos populares" gameIds={gameIds} />
    </div>
  );
};

export default Home;
