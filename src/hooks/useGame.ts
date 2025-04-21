import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Game } from "../types";

//Fetch un juego de Firebase


export const useGame = (gameId: string | undefined) => {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId) {
        setError("No game ID provided.");
        setLoading(false);
        return;
      }

      try {
        const gameDoc = doc(db, "games", gameId);
        const gameSnapshot = await getDoc(gameDoc);

        if (gameSnapshot.exists()) {
          setGame({ id: gameSnapshot.id, ...gameSnapshot.data() } as Game);
        } else {
          setError("Game not found.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching game:", err);
        setError("Failed to load game. Please try again later.");
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  return { game, loading, error };
};