// src/components/GameSlider.tsx
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import GameCard from './GameCard';
import { Game } from '../types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderContainer = styled.div`
  margin: 2rem 0;
  padding: 0 2rem;
`;

const SliderTitle = styled.h2`
  margin-bottom: 1rem;
`;

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
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <SliderContainer>
      <SliderTitle>{title}</SliderTitle>
      <Slider {...settings}>
        {games.map(game => (
          <div key={game.id} style={{ padding: '0 10px' }}>
            <GameCard game={game} />
          </div>
        ))}
      </Slider>
    </SliderContainer>
  );
};

export default GameSlider;