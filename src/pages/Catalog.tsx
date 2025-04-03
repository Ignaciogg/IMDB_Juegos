import React, { useEffect, useState } from 'react';
import styles from '../assets/css/Catalog.module.css'; 
import { useTheme } from '../context/ThemeContext';
import { fetchPopularGames, fetchBGGGame, fetchBGGGameByName } from '../data/api'; 
import Filters from '../components/Filters'; 
import GameGrid from '../components/GameGrid'; 
import Pagination from '../components/Pagination'; 
import { Game } from '../types'; 

const Catalog: React.FC = () => {
  const { theme } = useTheme();
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gamesPerPage = 8;

 
  useEffect(() => {
    async function loadPopularGames() {
      setLoading(true);
      try {
        const popularIds = await fetchPopularGames();
        const limitedIds = popularIds.slice(0, 20);
        const gamesData = await Promise.all(limitedIds.map(id => fetchBGGGame(id)));
        setAllGames(gamesData);
        setFilteredGames(gamesData);
      } catch (error) {
        console.error('Failed to load popular games:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPopularGames();
  }, []);


  useEffect(() => {
    const filtered = allGames.filter(game =>
      players <= 1 || (game.minPlayers <= players && game.maxPlayers >= players)
    );
    setFilteredGames(filtered);
    setCurrentPage(1);
  }, [players, allGames]);

  
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      const filtered = allGames.filter(game =>
        players <= 1 || (game.minPlayers <= players && game.maxPlayers >= players)
      );
      setFilteredGames(filtered);
      return;
    }

    setLoading(true);
    try {
      const searchedGames = await fetchBGGGameByName(searchQuery);
      const filtered = searchedGames.filter(game =>
        players <= 1 || (game.minPlayers <= players && game.maxPlayers >= players)
      );
      setAllGames(searchedGames);
      setFilteredGames(filtered);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching games:', error);
      setFilteredGames([]);
    } finally {
      setLoading(false);
    }
  };


  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className={`${styles.catalogContainer} ${styles[theme]}`}>Loading games...</div>;
  }

  return (
    <div className={`${styles.catalogContainer} ${styles[theme]}`}>
      <h1 className={styles.title}>Catálogo de Juegos</h1>
      <Filters
        theme={theme}
        players={players}
        setPlayers={setPlayers}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <GameGrid games={currentGames} theme={theme} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
        theme={theme}
      />
    </div>
  );
};

export default Catalog;