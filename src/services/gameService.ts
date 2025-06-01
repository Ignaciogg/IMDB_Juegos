import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Game } from "../types";
import { Review } from "../components/ReviewsList";

export const fetchGamesFromFirestore = async (): Promise<Game[]> => {
  const gamesCollection = collection(db, "games");
  const gamesSnapshot = await getDocs(gamesCollection);
  return gamesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Game[];
};

export const fetchReviewsByGameId = async (gameId: string): Promise<Review[]> => {
  const reviewsRef = collection(db, "reviews");
  const q = query(reviewsRef, where("game", "==", gameId));
  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((doc) => {
      const data = doc.data() as any;
      if (!data.username || !data.reviewText) return null;
      return {
        id: doc.id,
        username: data.username,
        reviewText: data.reviewText,
        rating: Number(data.rating ?? 0),
      };
    })
    .filter((r): r is Review => r !== null);
};