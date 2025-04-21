import React, { useState } from "react";
import styles from "./Catalog.module.css";
import GameCard from "../components/GameCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useTheme } from "../context/ThemeContext";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";
import SearchBarWithOptions from "../components/SearchBarWithOptions";
import { useGames } from "../hooks/useGames";
import { useFilteredGames } from "../hooks/useFilteredGames";
import useGamesPerPage from "../hooks/useGamesPerPage"; // Importar el nuevo hook

const Catalog: React.FC = () => {
  const { theme } = useTheme();
  const { games, loading, error } = useGames();
  const gamesPerPage = useGamesPerPage(); 

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [players, setPlayers] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categories = Array.from(
    new Set(games.flatMap((game) => game.categories))
  ).sort();

  const filteredGames = useFilteredGames({
    selectedCategory,
    players,
    searchQuery,
    games,
  });

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <LoadingSpinner message="Loading games..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className={`${styles.catalogContainer} ${styles[theme]}`}>
      <h1 className={`${styles.title} ${styles[theme]}`}>Catalog of Games</h1>

      <div className={`${styles.filtersContainer} ${styles[theme]}`}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search by name"
        />
        <SearchBarWithOptions
          searchQuery={selectedCategory}
          setSearchQuery={setSelectedCategory}
          placeholder="Search by category"
          options={categories}
          onOptionSelect={(category: string) => setSelectedCategory(category)}
        />
        <FilterBar players={players} setPlayers={setPlayers} theme={theme} />
      </div>

      <div className={`${styles.gamesGrid} ${styles[theme]}`}>
        {currentGames.length === 0 ? (
          <p>No games found matching your criteria.</p>
        ) : (
          currentGames.map((game) => <GameCard key={game.id} game={game} />)
        )}
      </div>
      <div className={`${styles.pagination} ${styles[theme]}`}>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
          theme={theme}
          buttonClass={`${styles.customPageButton} ${styles[theme]}`}
        />
      </div>
    </div>
  );
};

export default Catalog;