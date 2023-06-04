import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../assets/styles/dyno.module.scss';
import dynoImg from '../assets/images/dyno.png';
import { DynoCactus } from './DynoCactus';
import { DynoGameModel } from '../models/DynoGameModel';
import {
  DYNO_ANIMATION_SPEED,
  DYNO_CACTUS_SPEED,
  DYNO_FIELD_WIDTH,
  DYNO_HEIGHT,
  DYNO_ITEMS_WIDTH,
  DYNO_LEFT_WIDTH
} from '../constants';
import { isMobile } from '../../../utils/helpers';
import { useFocus } from '../../../hooks/useFocus';

export const DynoGame = () => {
  const { t } = useTranslation();

  const [game, setGame] = useState<DynoGameModel | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [dynoClasses, setDynoClasses] = useState([styles.dyno]);
  const [isJumpInProgress, setIsJumpInProgress] = useState(false);

  const gameInterval = useRef<null | ReturnType<typeof setInterval>>(null);
  const field = useRef<HTMLDivElement>(null);
  const dyno = useRef<HTMLDivElement>(null);
  useFocus(field);

  const text = useMemo(() => {
    return isMobile() ? t('dyno_mobile_start') : t('flappy_start_text');
  }, [t]);

  const gameOver = () => {
    if (gameInterval.current) {
      clearInterval(gameInterval.current);
    }
    setGame(null);
    setIsGameOver(true);
    setIsGameStarted(false);
  };

  const move = useCallback(() => {
    if (game && dyno.current) {
      game.moveCactuses();
      const newGame = game.getCopyGame();
      setGame(newGame);
      const dynoBottom = parseInt(window.getComputedStyle(dyno.current).bottom);
      if (
        newGame.cactuses[0]?.right > DYNO_FIELD_WIDTH - DYNO_ITEMS_WIDTH &&
        newGame.cactuses[0]?.right < DYNO_FIELD_WIDTH - DYNO_LEFT_WIDTH &&
        dynoBottom < DYNO_HEIGHT
      ) {
        gameOver();
      }
    }
  }, [game]);

  const jump = () => {
    setDynoClasses([styles.dyno, styles.jump]);
    setTimeout(() => {
      setDynoClasses([styles.dyno]);
      setIsJumpInProgress(false);
    }, DYNO_ANIMATION_SPEED);
  };

  const startGame = () => {
    const newGame = new DynoGameModel();
    newGame.startGame();
    setGame(newGame);
    setIsGameStarted(true);
    setIsGameOver(false);
  };

  const action = () => {
    if (!isGameStarted) {
      startGame();
    }
    if (!isJumpInProgress) {
      setIsJumpInProgress(true);
      jump();
    }
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.code === 'Space') {
      action();
    }
  };

  useEffect(() => {
    if (isGameStarted) {
      if (gameInterval.current) {
        clearInterval(gameInterval.current);
      }
      gameInterval.current = setInterval(() => move(), DYNO_CACTUS_SPEED);
    }
  }, [move, isGameStarted]);

  return (
    <div className={styles.game}>
      <div
        className={styles.field}
        ref={field}
        onKeyDown={onKeyPress}
        onClick={action}
        tabIndex={0}
      >
        {!isGameStarted && <p className={styles.text}>{text}</p>}
        {isGameOver && <p className={styles.text}>Game Over!!!</p>}
        <div
          className={dynoClasses.join(' ')}
          ref={dyno}
        >
          <img
            src={dynoImg}
            alt="dyno icon"
          />
        </div>
        {game?.cactuses.map((cactus) => {
          return (
            <DynoCactus
              key={cactus.id}
              cactusModel={cactus}
            />
          );
        })}
      </div>
    </div>
  );
};
