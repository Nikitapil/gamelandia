import React, { useCallback, useEffect, useRef, useState } from 'react';
import flappyStyles from '../../styles/flappy.module.scss';
import { FlappyPipe } from './FlappyPipe';
import { FlappyGameModel } from '../../models/flappy/FlappyGameModel';
import { FlappyHero } from './FlappyHero';

export const FlappyField = () => {
  const [game, setGame] = useState(new FlappyGameModel());
  const pipeInterval = useRef<null | ReturnType<typeof setInterval>>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const move = useCallback(() => {
    game.movePipes();
    game.bird.moveDown();
    const newGame = game.getGameCopy();
    setGame(newGame);
  }, [game]);

  const startGame = () => {
    const newGame = new FlappyGameModel();
    newGame.startGame();
    setGame(newGame);
    setIsGameStarted(true);
  };

  useEffect(() => {
    if (isGameStarted) {
      if (pipeInterval.current) {
        clearInterval(pipeInterval.current);
      }
      pipeInterval.current = setInterval(() => move(), 10);
    }
  }, [game, move, isGameStarted]);

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.code === 'Space') {
      if (!isGameStarted) {
        startGame();
      }
    }
  };

  return (
    <div className={flappyStyles.field} tabIndex={0} onKeyDown={onKeyPress}>
      <div className={flappyStyles.top} />
      <FlappyHero game={game} />
      {game.pipes.map((pipe) => (
        <FlappyPipe key={Math.random()} pipe={pipe} />
      ))}
      <div className={flappyStyles.bottom} />
    </div>
  );
};
