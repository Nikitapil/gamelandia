import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronDown,
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleChevronUp
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { SnakeBoard } from '../components/snake/SnakeBoard';
import {
  ESnakeDirections,
  snakeLevels,
  snakeLevelsOptions,
  TSnakeLevels
} from '../constants/snake';
import { SnakeBoardModel } from '../models/snake/SnakeBoardModel';
import snakeStyles from '../styles/snake.module.scss';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { breadcrumbs } from '../constants/breadcrumbs';
import { useTitle } from '../hooks/useTitle';
import { isMobile } from '../utils/helpers';
import { AppButton } from '../components/UI/AppButton';
import { useAppSelector } from '../hooks/useAppSelector';
import { authSelector } from '../store/selectors';
import { CommonScoreBoard } from '../score/components/CommonScoreBoard';
import { EGamesNames } from '../constants/games';
import { useCreateScore } from '../score/hooks/useCreateScore';
import { AppRadioButton } from '../components/UI/AppRadioButton/AppRadioButton';

export const Snake = () => {
  useTitle('Snake');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.snake]);
  const snakeContainer = useRef<HTMLDivElement | null>(null);
  const [board, setBoard] = useState<SnakeBoardModel | null>(null);
  const [gameOver, setGameOver] = useState('');
  const [isClickAvailable, setIsClickAvailable] = useState(true);
  const [timer, setTimer] = useState<TSnakeLevels>(100);
  const [isNewGameButtonDisabled, setIsNewGameButtonDisabled] = useState(false);
  const movingTimeOut = useRef<null | ReturnType<typeof setInterval>>(null);
  const { user } = useAppSelector(authSelector);
  const createScore = useCreateScore();
  const { t } = useTranslation();

  const onMove = () => {
    board?.snake?.move();
    setBoard(board?.updateBoard()!);
  };

  // TODO refactor
  const level = useMemo(() => {
    return snakeLevels[timer];
  }, [timer]);

  const startMoving = () => {
    if (movingTimeOut.current) {
      clearInterval(movingTimeOut.current);
    }
    movingTimeOut.current = setInterval(onMove, timer);
  };

  const redisableClick = () => {
    setIsClickAvailable(false);
    setTimeout(() => {
      setIsClickAvailable(true);
    }, timer);
  };

  const newGame = () => {
    setGameOver('');
    const newBoard = new SnakeBoardModel();
    newBoard.initCells();
    newBoard?.addSnake();
    newBoard?.addFood();
    setBoard(newBoard);
  };

  const onKeyPress = (e: React.KeyboardEvent, btn: null | string = null) => {
    if (board?.snake && isClickAvailable && !gameOver) {
      if (
        (e.code === 'ArrowRight' || btn === 'right') &&
        board.snake.direction !== ESnakeDirections.LEFT &&
        board.snake.direction !== ESnakeDirections.RIGHT
      ) {
        board?.snake?.changeDirection(ESnakeDirections.RIGHT);
        startMoving();
        redisableClick();
      }
      if (
        (e.code === 'ArrowDown' || btn === 'down') &&
        board.snake.direction !== ESnakeDirections.TOP &&
        board.snake.direction !== ESnakeDirections.BOTTOM
      ) {
        board?.snake?.changeDirection(ESnakeDirections.BOTTOM);
        startMoving();
        redisableClick();
      }
      if (
        (e.code === 'ArrowUp' || btn === 'up') &&
        board.snake.direction !== ESnakeDirections.TOP &&
        board.snake.direction !== ESnakeDirections.BOTTOM
      ) {
        board?.snake?.changeDirection(ESnakeDirections.TOP);
        startMoving();
        redisableClick();
      }
      if (
        (e.code === 'ArrowLeft' || btn === 'left') &&
        board.snake.direction !== ESnakeDirections.LEFT &&
        board.snake.direction !== ESnakeDirections.RIGHT
      ) {
        board?.snake?.changeDirection(ESnakeDirections.LEFT);
        startMoving();
        redisableClick();
      }
    }
  };

  useEffect(() => {
    newGame();
  }, []);

  const onStartGame = () => {
    if (!isNewGameButtonDisabled) {
      snakeContainer.current?.focus();
      setIsNewGameButtonDisabled(true);
      startMoving();
    }
  };

  useEffect(() => {
    if (board?.gameOver) {
      setGameOver('GameOver!!!');
      setIsNewGameButtonDisabled(false);
      if (movingTimeOut.current) {
        clearInterval(movingTimeOut.current);
      }
      if (user) {
        createScore({
          level,
          value: board.score,
          gameName: EGamesNames.SNAKE
        });
      }
    }
  }, [board?.gameOver, board?.score, createScore, level, user]);

  const isShowMobileBtns = useMemo(() => {
    return isMobile();
  }, []);

  useEffect(() => {
    snakeContainer.current?.focus();
  }, []);

  return (
    <div
      className={`${snakeStyles.snake__container} container`}
      onKeyDown={onKeyPress}
      data-testid="snake-page"
      tabIndex={0}
      ref={snakeContainer}
    >
      <h2 className={snakeStyles.snake__title}>Snake Game</h2>
      <div className={snakeStyles.snake__btns}>
        {!isNewGameButtonDisabled && (
          <AppButton color="success" onClick={newGame} type="button" size="lg">
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
        <div className={snakeStyles.snake__difficulty}>
          <p>{t('difficulty')}:</p>
          <AppRadioButton
            options={snakeLevelsOptions}
            value={timer}
            setValue={setTimer}
            dataTestId="level"
          />
        </div>
      )}
      <p className={snakeStyles['snake__game-over']}>{gameOver}</p>
      <div className={snakeStyles.snake__boards}>
        <SnakeBoard board={board} />
        {isShowMobileBtns && (
          <div className={snakeStyles.snake__controlls}>
            <button
              onClick={(e: any) => onKeyPress(e, 'up')}
              className={snakeStyles['snake-controlls__btn']}
              type="button"
            >
              <FontAwesomeIcon icon={faCircleChevronUp} />
            </button>
            <div className={snakeStyles['snake-controlls__sides']}>
              <button
                onClick={(e: any) => onKeyPress(e, 'left')}
                className={snakeStyles['snake-controlls__btn']}
                type="button"
              >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              </button>
              <button
                onClick={(e: any) => onKeyPress(e, 'right')}
                className={snakeStyles['snake-controlls__btn']}
                type="button"
              >
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </button>
            </div>
            <button
              onClick={(e: any) => onKeyPress(e, 'down')}
              className={snakeStyles['snake-controlls__btn']}
              type="button"
            >
              <FontAwesomeIcon icon={faCircleChevronDown} />
            </button>
          </div>
        )}
        <CommonScoreBoard game={EGamesNames.SNAKE} user={user} />
      </div>
    </div>
  );
};
