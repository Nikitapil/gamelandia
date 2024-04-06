import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../assets/styles/styles.module.scss';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';
import { BrickGameModel } from '../models/BrickGame';
import { GameWithScore } from '../../components/GameWithScore/GameWithScore';
import { EGamesNames } from '../../constants';
import { authSelector } from '../../../store/selectors';
import { useCreateScore } from '../../../score/hooks/useCreateScore';
import { useAppSelector } from '../../../hooks/useAppSelector';

const BrickGame = () => {
  const { t } = useTranslation();
  const [game, setGame] = useState<BrickGameModel | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  const { user } = useAppSelector(authSelector);
  const createScore = useCreateScore();

  const updateGame = useCallback((gameInstance: BrickGameModel) => {
    setScore(gameInstance.score);
    setLives(gameInstance.lives);
    setIsGameOver(gameInstance.isGameOver);
  }, []);

  const newGame = useCallback(() => {
    setIsGameOver(false);
    setGame(() => (canvasRef.current ? new BrickGameModel(canvasRef.current, updateGame) : null));
  }, [updateGame]);

  useEffect(() => {
    if (!game) {
      newGame();
      gameRef.current?.focus();
    }
    if (isGameOver && user) {
      createScore({
        gameName: EGamesNames.BRICK,
        value: score
      });
    }
  }, [createScore, game, isGameOver, newGame, score, user]);

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
    <GameWithScore
      game={EGamesNames.BRICK}
      user={user}
    >
      <div
        onKeyDown={keyDownHandler}
        onKeyUp={keyUpHandler}
        tabIndex={0}
        ref={gameRef}
      >
        <div className={`container ${styles.brick}`}>
          <h2 className="page-title">Brick Game</h2>
          <div className={styles.meta}>
            <p>
              {t('score')}: {score}
            </p>
            <p>
              {t('lives')}: {lives}
            </p>
          </div>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
          />
        </div>
      </div>
    </GameWithScore>
  );
};

export default BrickGame;
