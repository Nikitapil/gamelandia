import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CANVAS_HEIGHT, CANVAS_WIDTH, MAX_HEALTH } from '../constants';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { EGamesNames } from '../../constants';

import { AsteroidGame } from '../models/AsteroidGame';

import { authSelector } from '../../../store/selectors';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { useCreateScore } from '../../../score/hooks/useCreateScore';
import { useTitle } from '../../../hooks/useTitle';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';

import { GameWithScore } from '../../components/GameWithScore/GameWithScore';
import AsteroidHealthBar from '../components/AsteroidHealthBar';

import styles from '../assets/styles/styles.module.scss';

export const AsteroidWarrior = () => {
  useTitle('Asteroid Warrior');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.asteroid]);

  const { t } = useTranslation();

  const [game, setGame] = useState<AsteroidGame | null>(null);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(MAX_HEALTH);
  const [isGameOver, setIsGameOver] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  const { user } = useAppSelector(authSelector);

  const createScore = useCreateScore();

  const updateGame = useCallback(
    async (gameInstance: AsteroidGame) => {
      setScore(gameInstance.score);
      setHealth(gameInstance.health);
      setIsGameOver(gameInstance.isGameOver);
      if (gameInstance.isGameOver) {
        await createScore({ value: gameInstance.score, gameName: EGamesNames.ASTEROID });
      }
    },
    [createScore]
  );

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
    return () => {
      if (game) {
        game.stopGame();
      }
    };
  }, [game, updateGame]);

  return (
    <GameWithScore
      game={EGamesNames.ASTEROID}
      user={user}
    >
      <div className="container game-page-container">
        <h2 className="page-title">Asteroid warrior</h2>

        <div className={styles['game-meta']}>
          <p>Score: {score}</p>
          <AsteroidHealthBar
            maxHealth={200}
            currentHealth={health}
          />
        </div>

        {(!game || isGameOver) && (
          <p className={styles.instruction}>{t('press_button_to_start')}</p>
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
    </GameWithScore>
  );
};
