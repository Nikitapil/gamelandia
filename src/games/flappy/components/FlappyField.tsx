import { useCallback, useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import styles from '../assets/styles/flappy.module.scss';
import { FlappyPipe } from './FlappyPipe';
import { FlappyGameModel } from '../models/FlappyGameModel';
import { FlappyHero } from './FlappyHero';
import { useFocus } from '../../../hooks/useFocus';

interface IFlappyFieldProps {
  onUpdateScore: (score: number) => Promise<void>;
}

export const FlappyField = ({ onUpdateScore }: IFlappyFieldProps) => {
  const { t } = useTranslation();

  const [game, setGame] = useState(new FlappyGameModel());
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isPressUnavailable, setIsPressUnavailable] = useState(false);

  const pipeInterval = useRef<null | ReturnType<typeof setInterval>>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useFocus(containerRef);

  const move = useCallback(() => {
    game.move();
    const newGame = game.getGameCopy();
    setGame(newGame);
  }, [game]);

  const startGame = () => {
    const newGame = new FlappyGameModel();
    newGame.startGame();
    setGame(newGame);
    setIsGameStarted(true);
  };

  const onKeyPress = (e: KeyboardEvent) => {
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
    if (isGameStarted && !game.isGameOver) {
      if (pipeInterval.current) {
        clearInterval(pipeInterval.current);
      }
      pipeInterval.current = setInterval(() => move(), 5);
    }
  }, [game, move, isGameStarted]);

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
  }, [game.isGameOver, game.score, onUpdateScore]);

  return (
    <div
      className={styles.field}
      tabIndex={0}
      ref={containerRef}
      onKeyDown={onKeyPress}
    >
      <div className={styles.top} />
      {!isGameStarted && <p className={styles['start-message']}>{t('flappy_start_text')}</p>}
      <p className={styles.score}>{game.score}</p>
      {game.isGameOver && <p className={styles['game-over-message']}>Game Over</p>}
      <FlappyHero game={game} />
      {game.pipes.map((pipe) => (
        <FlappyPipe
          key={uuidv4()}
          pipe={pipe}
        />
      ))}
      <div className={styles.bottom} />
    </div>
  );
};
