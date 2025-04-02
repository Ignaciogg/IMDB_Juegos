
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Game } from '../types';
import { games } from '../data/games'; 

const GamePage: React.FC = () => {
  const { id } = useParams(); 
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    
    const foundGame = games.find(game => game.id.toString() === id);
    setGame(foundGame || null); 
  }, [id]);

  if (!game) return <div>Game not found!</div>; 

  return (
    <div>
      <h1>{game.name}</h1>
      <img src={game.image} alt={game.name} />
      <p>{game.description}</p>
      <p>Rating: {game.rating}</p>
      <p>Players: {game.minPlayers} - {game.maxPlayers}</p>
      <p>Categories: {game.categories.join(', ')}</p>
    </div>
  );
};

export default GamePage;
