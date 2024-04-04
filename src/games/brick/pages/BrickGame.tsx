import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../assets/styles/styles.module.scss';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';
import { BrickGameModel } from '../models/BrickGame';

const BrickGame = () => {
  const [game, setGame] = useState<BrickGameModel | null>(null);
  const [score, setScore] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateGame = (gameInstance: BrickGameModel) => {
    setScore(gameInstance.score);
  };

  useEffect(() => {
    setGame(() => (canvasRef.current ? new BrickGameModel(canvasRef.current, updateGame) : null));
  }, []);

  const keyDownHandler = useCallback(
    (e: React.KeyboardEvent) => {
      if (!game) return;
      if (!game.isGameRunning) {
        game.startGame();
      } else if (e.key === 'ArrowRight') {
        game.isPaddleMoveRight = true;
      } else if (e.key === 'ArrowLeft') {
        game.isPaddleMoveLeft = true;
      }
    },
    [game]
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
    >
      <div className={`container ${styles.brick}`}>
        <h2 className="page-title">Brick Game</h2>
        <p className={styles.score}>Score: {score}</p>
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
