import { fetchBGGGame } from "./api";

export const games: any[] = [];

const gameIds = [13, 174430, 161936,12,25,122,23]; // Example BGG game IDs

async function loadGames() {
  try {
    for (const id of gameIds) {
      const gameData = await fetchBGGGame(id);
      games.push(gameData);
    }
    console.log("Games loaded:", games);
  } catch (error) {
    console.error("Error loading games:", error);
  }
}

loadGames();
