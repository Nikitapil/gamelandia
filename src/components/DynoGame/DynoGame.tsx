import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import styles from '../../styles/dyno.module.scss';
import dynoImg from '../../assets/dyno/dyno.png';
import { DynoCactus } from './DynoCactus';
import { DynoGameModel } from '../../models/DynoGame/DynoGameModel';

export const DynoGame = () => {
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
        newGame.cactuses[0]?.right > fieldWidth - 90 &&
        newGame.cactuses[0]?.right < fieldWidth - 20 &&
        dynoBottom < 50
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
    }, 1400);
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
      gameInterval.current = setInterval(() => move(), 3);
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
        {!isGameStarted && <p className={styles.text}>Press Space To Start</p>}
        {isGameOver && <p className={styles.text}>Game Over!!!</p>}
        <div className={dynoClasses.join(' ')} ref={dyno}>
          <img src={dynoImg} alt="dyno-icon" />
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
