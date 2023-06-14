import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SnakeBoard } from '../components/SnakeBoard';
import { ESnakeDirections, snakeLevels, snakeLevelsOptions, TSnakeLevels } from '../constants';
import { SnakeBoardModel } from '../models/SnakeBoardModel';
import styles from '../assets/styles/snake.module.scss';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { isMobile } from '../../../utils/helpers';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';
import { useCreateScore } from '../../../score/hooks/useCreateScore';
import { AppRadioButton } from '../../../components/UI/AppRadioButton/AppRadioButton';
import { EGamesNames } from '../../constants';
import { useFocus } from '../../../hooks/useFocus';
import { MobileButtons } from '../../components/MobileButtons/MobileButtons';
import { GameWithScore } from '../../components/GameWithScore/GameWithScore';

export const Snake = () => {
  const { t } = useTranslation();
  useTitle('Snake');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.snake]);

  const [board, setBoard] = useState<SnakeBoardModel | null>(null);
  const [gameOver, setGameOver] = useState('');
  const [isClickAvailable, setIsClickAvailable] = useState(true);
  const [timer, setTimer] = useState<TSnakeLevels>(100);
  const [isNewGameButtonDisabled, setIsNewGameButtonDisabled] = useState(false);

  const movingTimeOut = useRef<null | ReturnType<typeof setInterval>>(null);
  const snakeContainer = useRef<HTMLDivElement | null>(null);
  useFocus(snakeContainer);

  const { user } = useAppSelector(authSelector);
  const createScore = useCreateScore();

  const onMove = () => {
    if (!board) {
      return;
    }
    board.snake?.move();
    setBoard(board.updateBoard());
  };

  const startMoving = () => {
    if (movingTimeOut.current) {
      clearInterval(movingTimeOut.current);
    }
    movingTimeOut.current = setInterval(onMove, timer);
  };

  const reDisableClick = () => {
    setIsClickAvailable(false);
    setTimeout(() => {
      setIsClickAvailable(true);
    }, timer);
  };

  const newGame = () => {
    setGameOver('');
    const newBoard = new SnakeBoardModel();
    newBoard.startGame();
    setBoard(newBoard);
  };

  const changeDirection = (direction: ESnakeDirections) => {
    board?.snake?.changeDirection(direction);
    startMoving();
    reDisableClick();
  };

  const onKeyPress = (e: React.KeyboardEvent | null, btn: null | string = null) => {
    if (board?.snake && isClickAvailable && !gameOver && isNewGameButtonDisabled) {
      if ((e?.code === 'ArrowRight' || btn === 'right') && board.snake.isCurrentVertical) {
        changeDirection(ESnakeDirections.RIGHT);
      }
      if ((e?.code === 'ArrowDown' || btn === 'down') && board.snake.isCurrentHorizontal) {
        changeDirection(ESnakeDirections.BOTTOM);
      }
      if ((e?.code === 'ArrowUp' || btn === 'up') && board.snake.isCurrentHorizontal) {
        changeDirection(ESnakeDirections.TOP);
      }
      if ((e?.code === 'ArrowLeft' || btn === 'left') && board.snake.isCurrentVertical) {
        changeDirection(ESnakeDirections.LEFT);
      }
    }
  };

  const onStartGame = () => {
    if (!isNewGameButtonDisabled) {
      snakeContainer.current?.focus();
      setIsNewGameButtonDisabled(true);
      startMoving();
    }
  };

  const selectLevel = (level: TSnakeLevels) => {
    newGame();
    setTimer(level);
  };

  const isShowMobileBtns = useMemo(() => {
    return isMobile();
  }, []);

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    if (board?.gameOver) {
      setGameOver('GameOver!!!');
      setIsNewGameButtonDisabled(false);
      if (movingTimeOut.current) {
        clearInterval(movingTimeOut.current);
      }
      if (user) {
        const level = snakeLevels[timer];
        createScore({
          level,
          value: board.score,
          gameName: EGamesNames.SNAKE
        });
      }
    }
  }, [board?.gameOver, board?.score, createScore, timer, user]);

  return (
    <div
      className={`${styles.snake__container} container`}
      onKeyDown={onKeyPress}
      data-testid="snake-page"
      tabIndex={0}
      ref={snakeContainer}
    >
      <h2 className="page-title">Snake Game</h2>
      <div className={styles.snake__btns}>
        {!isNewGameButtonDisabled && (
          <AppButton
            color="success"
            onClick={newGame}
            type="button"
            size="lg"
          >
            {t('new_game')}
          </AppButton>
        )}
        {!gameOver && !isNewGameButtonDisabled && (
          <AppButton
            color="success"
            size="lg"
            onClick={onStartGame}
            testId="start-game"
            type="button"
          >
            {t('start_game')}
          </AppButton>
        )}
        <p>
          {t('score')}: {board?.score}
        </p>
      </div>
      {!isNewGameButtonDisabled && (
        <div className={styles.snake__difficulty}>
          <p>{t('difficulty')}:</p>
          <AppRadioButton
            options={snakeLevelsOptions}
            value={timer}
            setValue={selectLevel}
            dataTestId="level"
          />
        </div>
      )}
      <p className={styles['snake__game-over']}>{gameOver}</p>
      <GameWithScore
        game={EGamesNames.SNAKE}
        user={user}
      >
        <SnakeBoard board={board} />
        {isShowMobileBtns && <MobileButtons onClick={onKeyPress} />}
      </GameWithScore>
    </div>
  );
};
