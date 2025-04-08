export interface Game {
  id: string; // Firestore document ID
  name: string;
  year: number;
  min_players: number;
  max_players: number;
  description: string;
  categories: string[];
  average_rating: number; // From Firestore
  totalRatings: number; // From Firestore
  image: string | null; // Image URL or null
}