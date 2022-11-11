import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/dyno.module.scss';
import dynoImg from '../../assets/dyno/dyno.png';
import { DynoCactus } from './DynoCactus';
import { DynoGameModel } from '../../models/DynoGame/DynoGameModel';
import {
  DYNO_ANIMATION_SPEED,
  DYNO_CACTUS_SPEED,
  DYNO_HEIGHT,
  DYNO_ITEMS_WIDTH,
  DYNO_LEFT_WIDTH
} from '../../constants/dyno';

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

  const fieldWidth = useMemo(() => {
    if (!field.current) {
      return 0;
    }
    return parseInt(window.getComputedStyle(field.current).width);
  }, [field.current]);

  const gameOver = () => {
    if (gameInterval.current) {
      clearInterval(gameInterval.current);
    }
    setGame(null);
    setIsGameOver(true);
    setIsGameStarted(false);
  };

  const move = useCallback(() => {
    if (game) {
      game.moveCactuses();
      const newGame = game.getCopyGame();
      setGame(newGame);
      const dynoBottom = parseInt(
        window.getComputedStyle(dyno.current!).bottom
      );
      if (
        newGame.cactuses[0]?.right > fieldWidth - DYNO_ITEMS_WIDTH &&
        newGame.cactuses[0]?.right < fieldWidth - DYNO_LEFT_WIDTH &&
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
    if (fieldWidth) {
      const newGame = new DynoGameModel(fieldWidth);
      newGame.startGame();
      setGame(newGame);
      setIsGameStarted(true);
      setIsGameOver(false);
    }
  };

  useEffect(() => {
    if (isGameStarted) {
      if (gameInterval.current) {
        clearInterval(gameInterval.current);
      }
      gameInterval.current = setInterval(() => move(), DYNO_CACTUS_SPEED);
    }
  }, [game, move, isGameStarted]);

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
    if (field.current) {
      field.current.focus();
    }
  }, []);

  return (
    <div className={styles.game}>
      <div
        className={styles.field}
        ref={field}
        onKeyDown={onKeyPress}
        onClick={action}
        tabIndex={0}
      >
        {!isGameStarted && (
          <p className={styles.text}>{t('flappy_start_text')}</p>
        )}
        {isGameOver && <p className={styles.text}>Game Over!!!</p>}
        <div className={dynoClasses.join(' ')} ref={dyno}>
          <img src={dynoImg} alt="dyno icon" />
        </div>
        {game &&
          game.cactuses.map((cactus) => {
            return (
              <DynoCactus
                key={cactus.id}
                fieldWidth={fieldWidth}
                cactusModel={cactus}
              />
            );
          })}
      </div>
    </div>
  );
};
