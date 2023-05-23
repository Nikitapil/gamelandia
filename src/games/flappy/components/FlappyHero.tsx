import React, { useMemo } from 'react';
import birdPic from '../assets/images/bird.png';
import styles from '../assets/styles/flappy.module.scss';
import { FlappyGameModel } from '../models/FlappyGameModel';

interface IFlappyHeroProps {
  game: FlappyGameModel;
}

export const FlappyHero = ({ game }: IFlappyHeroProps) => {
  const heroStyles = useMemo(() => {
    return {
      top: game.bird.top
    };
  }, [game]);

  return (
    <div
      className={styles.bird}
      style={heroStyles}
    >
      <img
        src={birdPic}
        alt="bird"
      />
    </div>
  );
};
