import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import GameCard from "./GameCard";
import { fetchBGGGame } from "../data/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../assets/css/GameSlider.module.css";

interface GameSliderProps {
  title: string;
  gameIds: number[]; // Accept IDs instead of full game objects
}

const GameSlider: React.FC<GameSliderProps> = ({ title, gameIds }) => {
  const [games, setGames] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      try {
        const gameData = await Promise.all(
          gameIds.map(async (id) => {
            try {
              return await fetchBGGGame(id);
            } catch (error) {
              console.error(`Error fetching game ${id}:`, error);
              return null;
            }
          })
        );
        // Filter out any null results
        setGames(gameData.filter((game) => game !== null));
      } catch (error) {
        console.error("Failed to load games:", error);
        setGames([]);
      } finally {
        setLoading(false);
      }
    }
    loadGames();
  }, [gameIds]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <div>Loading games...</div>;

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.sliderTitle}>{title}</h2>
      {games && games.length > 0 ? (
        <Slider {...settings}>
          {games.map((game) => (
            <div key={game.id} style={{ padding: "0 10px" }}>
              <GameCard gameId={game.id} />
            </div>
          ))}
        </Slider>
      ) : (
        <p>No games found.</p>
      )}
    </div>
  );
};

export default GameSlider;
