// src/components/GameCard.tsx
import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { Game } from '../types';
import { useTheme } from '../context/ThemeContext';

const Card = styled.div<{theme: 'light' | 'dark'}>`
  width: 250px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  background-color: ${props => props.theme === 'light' ? '#ffffff' : '#2d3436'};
  color: ${props => props.theme === 'light' ? '#212529' : '#f8f9fa'};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const GameContent = styled.div`
  padding: 1rem;
`;

const GameTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Rating = styled.span`
  margin-left: 0.5rem;
  font-weight: bold;
`;

const TotalRatings = styled.span`
  margin-left: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.7;
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.5rem;
`;

const Category = styled.span<{theme: 'light' | 'dark'}>`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  background-color: ${props => props.theme === 'light' ? '#e9ecef' : '#495057'};
`;

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { theme } = useTheme();
  
  return (
    <Card theme={theme}>
      <GameImage src={game.image} alt={game.name} />
      <GameContent>
        <GameTitle>{game.name}</GameTitle>
        <RatingContainer>
          <FaStar color="#ffc107" />
          <Rating>{game.rating.toFixed(1)}</Rating>
          <TotalRatings>({game.totalRatings})</TotalRatings>
        </RatingContainer>
        <Categories>
          {game.categories.map((category, index) => (
            <Category key={index} theme={theme}>{category}</Category>
          ))}
        </Categories>
      </GameContent>
    </Card>
  );
};

export default GameCard;