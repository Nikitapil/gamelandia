import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import flappyStyles from '../../styles/flappy.module.scss';
import { FlappyPipe } from './FlappyPipe';
import { FlappyGameModel } from '../../models/flappy/FlappyGameModel';
import { FlappyHero } from './FlappyHero';

interface FlappyFieldProps {
  onUpdateScore: (score: number) => Promise<void>;
}

export const FlappyField = ({ onUpdateScore }: FlappyFieldProps) => {
  const [game, setGame] = useState(new FlappyGameModel());
  const pipeInterval = useRef<null | ReturnType<typeof setInterval>>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isPressUnavailable, setIsPressUnavailable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const move = useCallback(() => {
    game.movePipes();
    game.bird.moveDown();
    game.checkIfGameOver();
    game.updateScore();
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
    if (isGameStarted && !game.isGameOver) {
      if (pipeInterval.current) {
        clearInterval(pipeInterval.current);
      }
      pipeInterval.current = setInterval(() => move(), 5);
    }
  }, [game, move, isGameStarted]);

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.code === 'Space' && !isPressUnavailable) {
      if (!isGameStarted) {
        startGame();
      } else {
        game.bird.moveTop();
        const newGame = game.getGameCopy();
        setGame(newGame);
      }
    }
  };

  useEffect(() => {
    if (game.isGameOver) {
      setIsGameStarted(false);
      setIsPressUnavailable(true);
      setTimeout(() => {
        setIsPressUnavailable(false);
      }, 1000);
      if (pipeInterval.current) {
        clearInterval(pipeInterval.current);
        pipeInterval.current = null;
      }
      onUpdateScore(game.score);
    }
  }, [game.isGameOver]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  return (
    <div
      className={flappyStyles.field}
      tabIndex={0}
      ref={containerRef}
      onKeyDown={onKeyPress}
    >
      <div className={flappyStyles.top} />
      {!isGameStarted && (
        <p className={flappyStyles['start-message']}>
          {t('flappy_start_text')}
        </p>
      )}
      <p className={flappyStyles.score}>{game.score}</p>
      {game.isGameOver && (
        <p className={flappyStyles['game-over-message']}>Game Over</p>
      )}
      <FlappyHero game={game} />
      {game.pipes.map((pipe) => (
        <FlappyPipe key={uuidv4()} pipe={pipe} />
      ))}
      <div className={flappyStyles.bottom} />
    </div>
  );
};
