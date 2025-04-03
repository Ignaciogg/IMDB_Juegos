export interface Game {
  id: number;
  name: string;
  image: string;
  rating: number;
  totalRatings: number;
  categories: string[]; 
  minPlayers: number;
  maxPlayers: number;
  description: string;
}
