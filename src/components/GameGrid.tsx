import React from 'react';
import styles from '../assets/css/Catalog.module.css'; 
import GameCard from './GameCard';
import { Game } from '../types';
interface GameGridProps {
  games: Game[];
  theme: string;
}

const GameGrid: React.FC<GameGridProps> = ({ games, theme }) => (
  <div className={styles.gamesGrid}>
    {games.length > 0 ? (
      games.map(game => <GameCard key={game.id} gameId={game.id} />)
    ) : (
      <p>No games found matching your criteria.</p>
    )}
  </div>
);

export default GameGrid;