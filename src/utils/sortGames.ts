import { Game } from "../types";

export const sortGamesByRating = (games: Game[]): Game[] => {
  return [...games].sort((a, b) => b.average_rating - a.average_rating);
};