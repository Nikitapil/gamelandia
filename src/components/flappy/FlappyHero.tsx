import React, { useMemo } from 'react';
import birdPic from '../../assets/flappy/bird.png';
import flappyStyles from '../../styles/flappy.module.scss';
import { FlappyGameModel } from '../../models/flappy/FlappyGameModel';

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
