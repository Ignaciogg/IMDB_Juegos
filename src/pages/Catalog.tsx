// src/pages/Catalog.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { games } from '../data/games';
import GameCard from '../components/GameCard';
import { GameCategory, Game } from '../types';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const CatalogContainer = styled.div<{theme: 'light' | 'dark'}>`
  min-height: calc(100vh - 200px);
  background-color: ${props => props.theme === 'light' ? '#ffffff' : '#121212'};
  color: ${props => props.theme === 'light' ? '#212529' : '#f8f9fa'};
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  text-align: center;
`;

const FiltersContainer = styled.div<{theme: 'light' | 'dark'}>`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${props => props.theme === 'light' ? '#f8f9fa' : '#2d3436'};
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 200px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Select = styled.select<{theme: 'light' | 'dark'}>`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'light' ? '#ced4da' : '#495057'};
  background-color: ${props => props.theme === 'light' ? '#ffffff' : '#343a40'};
  color: ${props => props.theme === 'light' ? '#212529' : '#f8f9fa'};
`;

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RangeValue = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input<{theme: 'light' | 'dark'}>`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.5rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'light' ? '#ced4da' : '#495057'};
  background-color: ${props => props.theme === 'light' ? '#ffffff' : '#343a40'};
  color: ${props => props.theme === 'light' ? '#212529' : '#f8f9fa'};
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button<{active?: boolean, theme: 'light' | 'dark'}>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'light' ? '#ced4da' : '#495057'};
  background-color: ${props => props.active 
    ? (props.theme === 'light' ? '#007bff' : '#0d6efd') 
    : (props.theme === 'light' ? '#ffffff' : '#343a40')};
  color: ${props => props.active ? '#ffffff' : (props.theme === 'light' ? '#212529' : '#f8f9fa')};
  cursor: pointer;
`;

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
    <CatalogContainer theme={theme}>
      <Title>Catálogo de Juegos</Title>
      
      <FiltersContainer theme={theme}>
        <FilterGroup>
          <Label>Categoría</Label>
          <Select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            theme={theme}
          >
            <option value="">Todas las categorías</option>
            {AllCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <Label>Número de jugadores: {players}</Label>
          <RangeContainer>
            <input
              type="range"
              min="1"
              max="10"
              value={players}
              onChange={(e) => setPlayers(parseInt(e.target.value))}
            />
            <RangeValue>
              <span>1</span>
              <span>10</span>
            </RangeValue>
          </RangeContainer>
        </FilterGroup>
        
        <FilterGroup>
          <Label>Buscar</Label>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Nombre del juego..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              theme={theme}
            />
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
          </SearchContainer>
        </FilterGroup>
      </FiltersContainer>
      
      <GamesGrid>
        {currentGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </GamesGrid>
      
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i + 1}
            onClick={() => paginate(i + 1)}
            active={currentPage === i + 1}
            theme={theme}
          >
            {i + 1}
          </PageButton>
        ))}
      </Pagination>
    </CatalogContainer>
  );
};

export default Catalog;