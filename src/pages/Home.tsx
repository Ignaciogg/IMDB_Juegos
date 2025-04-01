// src/pages/HomePage.tsx
import React from 'react';
import styled from 'styled-components';
import { games } from '../data/games';
import GameSlider from '../components/GameSlider';
import { useTheme } from '../context/ThemeContext';

const HomeContainer = styled.div<{theme: 'light' | 'dark'}>`
  min-height: calc(100vh - 200px);
  background-color: ${props => props.theme === 'light' ? '#ffffff' : '#121212'};
  color: ${props => props.theme === 'light' ? '#212529' : '#f8f9fa'};
  padding: 2rem 0;
`;

const HeroSection = styled.section<{theme: 'light' | 'dark'}>`
  text-align: center;
  padding: 4rem 2rem;
  background-color: ${props => props.theme === 'light' ? '#e9ecef' : '#2d3436'};
  margin-bottom: 2rem;
`;

const Home: React.FC = () => {
  const { theme } = useTheme();
  
  // Ordenar juegos por valoración para mostrar los populares
  const popularGames = [...games].sort((a, b) => b.rating - a.rating);

  return (
    <HomeContainer theme={theme}>
      <HeroSection theme={theme}>
        <h1>Descubre los mejores juegos de mesa</h1>
        <p>Tu plataforma para encontrar, valorar y compartir juegos de mesa</p>
      </HeroSection>
      
      <GameSlider title="Juegos populares" games={popularGames} />
    </HomeContainer>
  );
};

export default Home;