import React, { useState, useEffect } from 'react';
import styles from '../assets/css/Catalog.module.css'; 
import { games } from '../data/games';
import GameCard from '../components/GameCard';
import { GameCategory, Game } from '../types';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const AllCategories: GameCategory[] = [
  'Estrategia', 'Familiar', 'Party', 'Eurogame', 'Americano',
  'Cooperativo', 'Competitivo', 'Cartas', 'Rol'
];

const Catalog: React.FC = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [players, setPlayers] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredGames, setFilteredGames] = useState<Game[]>(games);
  
  const gamesPerPage = 10;
  
  useEffect(() => {
    // Filtrar juegos según criterios
    let result = games;
    
    if (selectedCategory) {
      result = result.filter(game => 
        game.categories.includes(selectedCategory as GameCategory)
      );
    }
    
    if (players > 1) {
      result = result.filter(game => 
        game.minPlayers <= players && game.maxPlayers >= players
      );
    }
    
    if (searchQuery) {
      result = result.filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredGames(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, players, searchQuery]);
  
  // Calcular juegos para la página actual
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
  
  // Calcular páginas totales
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={`${styles.catalogContainer} ${styles[theme]}`}>
      <h1 className={styles.title}>Catálogo de Juegos</h1>
      
      <div className={`${styles.filtersContainer} ${styles[theme]}`}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>Categoría</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`${styles.select} ${styles[theme]}`}
          >
            <option value="">Todas las categorías</option>
            {AllCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.label}>Número de jugadores: {players}</label>
          <div className={styles.rangeContainer}>
            <input
              type="range"
              min="1"
              max="10"
              value={players}
              onChange={(e) => setPlayers(parseInt(e.target.value))}
            />
            <div className={styles.rangeValue}>
              <span>1</span>
              <span>10</span>
            </div>
          </div>
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.label}>Buscar</label>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Nombre del juego..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${styles.searchInput} ${styles[theme]}`}
            />
            <div className={styles.searchIcon}>
              <FaSearch />
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.gamesGrid}>
        {currentGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''} ${styles[theme]}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
