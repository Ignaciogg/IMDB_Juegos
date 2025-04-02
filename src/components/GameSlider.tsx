import React from "react";
import Slider from "react-slick";
import GameCard from "./GameCard";
import { Game } from "../types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../assets/css/GameSlider.module.css";

interface GameSliderProps {
  title: string;
  games: Game[];
}

const GameSlider: React.FC<GameSliderProps> = ({ title, games }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.sliderTitle}>{title}</h2>
      <Slider {...settings}>
        {games.map((game) => (
          <div key={game.id} style={{ padding: "0 10px" }}>
            <GameCard game={game} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GameSlider;
