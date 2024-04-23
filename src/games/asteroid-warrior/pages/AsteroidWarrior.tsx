import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';
import styles from '../assets/styles/styles.module.scss';
import { AsteroidGame } from '../models/AsteroidGame';
import AsteroidHealthBar from '../components/AsteroidHealthBar';

export const AsteroidWarrior = () => {
  const [game, setGame] = useState<AsteroidGame | null>(null);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(200);
  const [isGameOver, setIsGameOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  const updateGame = useCallback((gameInstance: AsteroidGame) => {
    setScore(gameInstance.score);
    setHealth(gameInstance.health);
    setIsGameOver(gameInstance.isGameOver);
  }, []);

  const startNewGame = useCallback(() => {
    if (canvasRef.current) {
      const newGame = new AsteroidGame(canvasRef.current, updateGame);
      setGame(newGame);
      newGame.play();
    }
  }, [updateGame]);

  const keyDownHandler = useCallback(
    (e: React.KeyboardEvent) => {
      if (isGameOver || !game) {
        startNewGame();
        return;
      }
      if (e.code === 'Space') {
        game.addShots();
        return;
      }
      game.moveStarship(e.code, false);
    },
    [game, isGameOver, startNewGame]
  );

  const keyUpHandler = useCallback(
    (e: React.KeyboardEvent) => {
      if (!game) {
        return;
      }
      game.moveStarship(e.code, true);
    },
    [game]
  );

  useEffect(() => {
    gameRef?.current?.focus();
  }, [game, updateGame]);
  return (
    <div className="cntainer game-page-container">
      <h2 className="page-title">Asteroid warrior</h2>
      <div className={styles['game-meta']}>
        <p>Score: {score}</p>
        <AsteroidHealthBar
          maxHealth={200}
          currentHealth={health}
        />
      </div>

      {(!game || isGameOver) && (
        <p className={styles.instruction}>Press any button to start a new game</p>
      )}

      <div
        ref={gameRef}
        onKeyUp={keyUpHandler}
        onKeyDown={keyDownHandler}
        tabIndex={0}
      >
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
      </div>
    </div>
  );
};
