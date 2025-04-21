export interface Game {
  id: string; // Firestore  ID
  name: string;
  year: number;
  min_players: number;
  max_players: number;
  description: string;
  categories: string[];
  average_rating: number; 
  totalRatings: number; 
  image: string | null; // Image URL or null
}