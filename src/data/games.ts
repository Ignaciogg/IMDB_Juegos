import { Game } from '../types'; 

export const games: Game[] = [
  {
    id: 1,
    name: 'Catan',
    image: 'catan.png', // nombre del archivo en firebase. Actualizar reglas en testing
    rating: 4.7,
    totalRatings: 3254,
    categories: ['Estrategia', 'Familiar'],
    minPlayers: 3,
    maxPlayers: 4,
    description: 'Un juego clásico de construcción y comercio'
  },
  {
    id: 2,
    name: 'Pandemic',
    image: 'https://via.placeholder.com/300x200?text=Pandemic',
    rating: 4.9,
    totalRatings: 2856,
    categories: ['Cooperativo', 'Estrategia'],
    minPlayers: 2,
    maxPlayers: 4,
    description: 'Salva al mundo de enfermedades mortales'
  },
 
];

// Agregar más juegos dinámicamente
for (let i = 3; i <= 25; i++) {
  games.push({
    id: i,
    name: `Juego ${i}`,
    image: `https://via.placeholder.com/300x200?text=Juego${i}`,
    rating: Math.round((3 + Math.random() * 2) * 10) / 10,
    totalRatings: Math.floor(Math.random() * 3000) + 500,
    categories: ['Familiar', 'Cartas'],
    minPlayers: Math.floor(Math.random() * 2) + 1,
    maxPlayers: Math.floor(Math.random() * 6) + 2,
    description: `Descripción del juego ${i}`
  });
}
