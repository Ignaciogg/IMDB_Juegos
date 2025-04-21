import { useState, useEffect } from "react";
import { Game } from "../types";

interface FilterParams {
  selectedCategory: string;
  players: number;
  searchQuery: string;
  games: Game[];
}

export const useFilteredGames = ({ selectedCategory, players, searchQuery, games }: FilterParams) => {
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  useEffect(() => {
    let result = games;
    console.log("Initial games count:", games.length);

    if (selectedCategory) {
      result = result.filter((game) => game.categories.includes(selectedCategory));
      console.log("After category filter:", result.length, "Selected:", selectedCategory);
    }

    if (players > 1) {
      result = result.filter(
        (game) => game.min_players <= players && game.max_players >= players
      );
      console.log("After players filter:", result.length, "Players:", players);
    }

    if (searchQuery) {
      result = result.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log("After search filter:", result.length, "Search:", searchQuery);
    }

    console.log("Final filtered count:", result.length);
    setFilteredGames(result);
  }, [selectedCategory, players, searchQuery, games]);

  return filteredGames;
};
