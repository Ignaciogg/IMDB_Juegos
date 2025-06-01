import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Game } from "../types";
import { sortGamesByRating } from "../utils/sortGames";

export const usePopularGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesCollection = collection(db, "games");
        const gamesSnapshot = await getDocs(gamesCollection);
        const gamesList: Game[] = gamesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Game[];

        const sortedGames = sortGamesByRating(gamesList);
        setGames(sortedGames);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching games:", err);
        setError("Failed to load games. Please try again later.");
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
};