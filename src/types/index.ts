

export type GameCategory = 
  | 'Estrategia' 
  | 'Familiar' 
  | 'Party' 
  | 'Eurogame' 
  | 'Americano'
  | 'Cooperativo'
  | 'Competitivo'
  | 'Cartas'
  | 'Rol';



export interface Game {
  id: number;
  name: string;
  image: string;
  rating: number;
  totalRatings: number;
  categories: GameCategory[];
  minPlayers: number;
  maxPlayers: number;
  description: string;
}
