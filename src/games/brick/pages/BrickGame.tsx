import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../assets/styles/styles.module.scss';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';
import { BrickGameModel } from '../models/BrickGame';

const BrickGame = () => {
  const [game, setGame] = useState<BrickGameModel | null>(null);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  const updateGame = (gameInstance: BrickGameModel) => {
    setScore(gameInstance.score);
    setLives(gameInstance.lives);
  };

  const newGame = useCallback(() => {
    setGame(() => (canvasRef.current ? new BrickGameModel(canvasRef.current, updateGame) : null));
  }, []);

  useEffect(() => {
    newGame();
    gameRef.current?.focus();
  }, [newGame]);

  const keyDownHandler = useCallback(
    (e: React.KeyboardEvent) => {
      if (!game) return;
      if (game.isGameOver) {
        newGame();
        return;
      }
      if (!game.isGameRunning) {
        game.startGame();
      } else if (e.key === 'ArrowRight') {
        game.isPaddleMoveRight = true;
      } else if (e.key === 'ArrowLeft') {
        game.isPaddleMoveLeft = true;
      }
    },
    [game, newGame]
  );

  const keyUpHandler = useCallback(
    (e: React.KeyboardEvent) => {
      if (!game) return;
      if (e.key === 'ArrowRight') {
        game.isPaddleMoveRight = false;
      } else if (e.key === 'ArrowLeft') {
        game.isPaddleMoveLeft = false;
      }
    },
    [game]
  );

  return (
    <div
      onKeyDown={keyDownHandler}
      onKeyUp={keyUpHandler}
      tabIndex={0}
      ref={gameRef}
    >
      <div className={`container ${styles.brick}`}>
        <h2 className="page-title">Brick Game</h2>
        <div className={styles.meta}>
          <p>Score: {score}</p>
          <p>Lives: {lives}</p>
        </div>
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

export default BrickGame;
