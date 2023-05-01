import React, { useMemo } from 'react';
import birdPic from '../assets/images/bird.png';
import flappyStyles from '../assets/styles/flappy.module.scss';
import { FlappyGameModel } from '../models/FlappyGameModel';

interface FlappyHeroProps {
  game: FlappyGameModel;
}

export const FlappyHero = ({ game }: FlappyHeroProps) => {
  const styles = useMemo(() => {
    return {
      top: game.bird.top
    };
  }, [game]);

  return (
    <div className={flappyStyles.bird} style={styles}>
      <img src={birdPic} alt="bird" />
    </div>
  );
};
