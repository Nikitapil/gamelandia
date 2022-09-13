import { Auth } from 'firebase/auth';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronUp,
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { ScoreBoard } from '../components/snake/ScoreBoard';
import { SnakeBoard } from '../components/snake/SnakeBoard';
import { ESnakeDirections } from '../constants/snake';
import { SnakeBoardModel } from '../models/snake/SnakeBoardModel';
import { fetchSnakeBestScoore } from '../redux/snake/snakeActions';
import { SnakeService } from '../services/SnakeService';
import snakeStyles from '../styles/snake.module.scss';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { breadcrumbs } from '../constants/breadcrumbs';
import { useTitle } from '../hooks/useTitle';
import { isMobile } from '../utils/helpers';

interface SnakeProps {
  auth: Auth;
}

export const Snake: FC<SnakeProps> = ({ auth }) => {
  useTitle('Snake');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.snake]);
  const [board, setBoard] = useState<SnakeBoardModel | null>(null);
  const [gameOver, setGameOver] = useState('');
  const [isClickAvailable, setIsClickAvailable] = useState(true);
  const [timer, setTimer] = useState(100);
  const [isNewGameButtonDisabled, setIsNewGameButtonDisabled] = useState(false);
  const movingTimeOut = useRef<null | ReturnType<typeof setInterval>>(null);
  const [user] = useAuthState(auth);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onMove = () => {
    board?.snake?.move();
    setBoard(board?.updateBoard()!);
  };

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
      SnakeService.setRecord(board.score, timer);
      setTimeout(() => {
        dispatch(fetchSnakeBestScoore());
      }, 1500);
    }
  }, [board?.gameOver]);

  const isShowMobileBtns = useMemo(() => {
    return isMobile();
  }, []);

  return (
    <div
      className={`${snakeStyles.snake__container} container`}
      onKeyDown={onKeyPress}
      data-testid="snake-page"
    >
      <h2 className={snakeStyles.snake__title}>Snake Game</h2>
      <div className={snakeStyles.snake__btns}>
        {!isNewGameButtonDisabled && (
          <button
            className={snakeStyles.snake__btn}
            onClick={newGame}
            type="button"
          >
            {t('new_game')}
          </button>
        )}
        {!gameOver && (
          <button
            className={snakeStyles.snake__btn}
            onClick={onStartGame}
            data-testid="start-game"
            type="button"
          >
            {t('start_game')}
          </button>
        )}
        <p>
          {t('score')}: {board?.score}
        </p>
      </div>
      {!isNewGameButtonDisabled && (
        <div className={snakeStyles.snake__difficulty}>
          <p>{t('difficulty')}:</p>
          <button
            className={`${
              timer === 150 ? snakeStyles['snake-current-level'] : ''
            }`}
            onClick={() => setTimer(150)}
            data-testid="easy-level"
            type="button"
          >
            {t('easy')}
          </button>
          <button
            className={`${
              timer === 100 ? snakeStyles['snake-current-level'] : ''
            }`}
            onClick={() => setTimer(100)}
            data-testid="medium-level"
            type="button"
          >
            {t('medium')}
          </button>
          <button
            className={`${
              timer === 50 ? snakeStyles['snake-current-level'] : ''
            }`}
            onClick={() => setTimer(50)}
            data-testid="hard-level"
            type="button"
          >
            {t('hard')}
          </button>
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
        {user && <ScoreBoard user={user} />}
      </div>
    </div>
  );
};
