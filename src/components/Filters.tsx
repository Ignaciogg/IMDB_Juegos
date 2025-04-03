import React from 'react';
import styles from '../assets/css/Catalog.module.css'; 
import { FaSearch } from 'react-icons/fa';

interface FiltersProps {
  theme: string;
  players: number;
  setPlayers: (players: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  theme,
  players,
  setPlayers,
  searchQuery,
  setSearchQuery,
  onSearch,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={`${styles.filtersContainer} ${styles[theme]}`}>
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
            placeholder="Nombre del juego... (presiona Enter para buscar)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${styles.searchInput} ${styles[theme]}`}
          />
          <div className={styles.searchIcon}>
            <FaSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;