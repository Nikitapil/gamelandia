import {
  faCircleChevronDown,
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleChevronUp
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { TetrisBoard } from '../components/TetrisBoard';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useBreadcrumbs } from '../../../hooks/useBreadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { TetrisBoardModel } from '../models/TetrisBoardModel';
import tetrisStyle from '../assets/styles/tetris.module.scss';
import { isMobile } from '../../../utils/helpers';
import { AppButton } from '../../../components/UI/AppButton';
import { CommonScoreBoard } from '../../../score/components/CommonScoreBoard';
import { useCreateScore } from '../../../score/hooks/useCreateScore';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';
import { EGamesNames } from '../../constants';

export const Tetris = () => {
  const { t } = useTranslation();
  useTitle('Tetris');
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.tetris]);
  const [board, setBoard] = useState(new TetrisBoardModel());
  const [isShowStartBtn, setIsShowStartBtn] = useState(true);
  const [isShowNewGameBtn, setIsShowNewGameBtn] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const { user } = useAppSelector(authSelector);
  const createScore = useCreateScore();
  const figureInterval = useRef<null | ReturnType<typeof setInterval>>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  const initBoard = () => {
    if (figureInterval.current) {
      clearInterval(figureInterval.current);
    }
    setIsShowStartBtn(true);
    setIsShowNewGameBtn(false);
    setIsGameOver(false);
    setScore(0);
    const newBoard = new TetrisBoardModel();
    newBoard.initCells();
    setBoard(newBoard);
  };

  const gameOver = async () => {
    if (figureInterval.current) {
      clearInterval(figureInterval.current);
    }
    setIsShowNewGameBtn(true);
    setIsGameOver(true);
  };

  useEffect(() => {
    initBoard();
  }, []);

  useEffect(() => {
    if (isGameOver) {
      createScore({
        value: score,
        gameName: EGamesNames.TETRIS
      });
    }
  }, [createScore, isGameOver, score]);

  const onKeyPress = (e: KeyboardEvent, btnName?: string) => {
    if (e.code === 'ArrowRight' || btnName === 'right') {
      board.currentFigure?.moveRight();
      const newBoard = board.copyBoard();
      setBoard(newBoard);
    }
    if (e.code === 'ArrowLeft' || btnName === 'left') {
      board.currentFigure?.moveLeft();
      const newBoard = board.copyBoard();
      setBoard(newBoard);
    }
    if (e.code === 'ArrowDown' || btnName === 'down') {
      board.currentFigure?.moveDown();
      const newBoard = board.copyBoard();
      setBoard(newBoard);
    }
    if (e.code === 'ArrowUp' || btnName === 'up') {
      board.currentFigure?.changeDirection();
      const newBoard = board.copyBoard();
      setBoard(newBoard);
    }
  };

  const startMoving = (timer = 1000) => {
    if (figureInterval.current) {
      clearInterval(figureInterval.current);
    }
    board.startGame();
    const newBoard = board.copyBoard();
    setBoard(newBoard);
    figureInterval.current = setInterval(() => {
      if (board.currentFigure!.elems.length < 2) {
        gameOver();
      }
      const move = board.currentFigure?.moveDown();
      if (!move) {
        if (
          board.currentFigure!.elems.some((elem) => elem.cell.y <= 1) ||
          !board.currentFigure
        ) {
          gameOver();
        }
        const addScore = board.clearRows();
        const newBoard = board.copyBoard();
        setBoard(newBoard);
        setScore((prev) => prev + addScore * 10);
        const newTimer = addScore && timer > 400 ? timer - addScore * 4 : timer;
        startMoving(newTimer);
      }
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const newBoard = board.copyBoard();
      setBoard(newBoard);
    }, timer);
  };

  const startGame = () => {
    setIsShowStartBtn(false);
    setIsShowNewGameBtn(true);
    gameRef.current?.focus();
    startMoving();
  };

  const isShowMobileBtns = useMemo(() => {
    return isMobile();
  }, []);

  return (
    <div
      className={`container ${tetrisStyle['tetris-container']}`}
      onKeyDown={onKeyPress}
      ref={gameRef}
      tabIndex={0}
    >
      <h2 className={`page-title ${tetrisStyle.title}`}>
        <span className={tetrisStyle['color-blue']}>T</span>
        <span className={tetrisStyle['color-green']}>e</span>
        <span className={tetrisStyle['color-yellow']}>t</span>
        <span className={tetrisStyle['color-orange']}>r</span>
        <span className={tetrisStyle['color-red']}>i</span>s
      </h2>
      {isGameOver && <p className={tetrisStyle['game-over']}>Game over</p>}
      <div className={tetrisStyle.controlls}>
        {isShowStartBtn && (
          <AppButton
            size="sm"
            color="success"
            onClick={startGame}
            type="button"
            customClass={tetrisStyle['game-btn']}
          >
            {t('start_game')}
          </AppButton>
        )}
        {isShowNewGameBtn && (
          <AppButton
            size="sm"
            color="success"
            onClick={initBoard}
            type="button"
            customClass={tetrisStyle['game-btn']}
          >
            {t('new_game')}
          </AppButton>
        )}
        <p className={tetrisStyle.score}>
          {t('score')}: {score}
        </p>
      </div>
      <div className={tetrisStyle['tetris-boards']}>
        <TetrisBoard board={board} />
        {isShowMobileBtns && (
          <div className={tetrisStyle.mobile__controlls}>
            <button
              onClick={(e: any) => onKeyPress(e, 'up')}
              className={tetrisStyle['mobile-controlls__btn']}
              type="button"
            >
              <FontAwesomeIcon icon={faCircleChevronUp} />
            </button>
            <div className={tetrisStyle['mobile-controlls__sides']}>
              <button
                onClick={(e: any) => onKeyPress(e, 'left')}
                className={tetrisStyle['mobile-controlls__btn']}
                type="button"
              >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              </button>
              <button
                onClick={(e: any) => onKeyPress(e, 'right')}
                className={tetrisStyle['mobile-controlls__btn']}
                type="button"
              >
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </button>
            </div>
            <button
              onClick={(e: any) => onKeyPress(e, 'down')}
              className={tetrisStyle['mobile-controlls__btn']}
              type="button"
            >
              <FontAwesomeIcon icon={faCircleChevronDown} />
            </button>
          </div>
        )}
        <CommonScoreBoard user={user} game={EGamesNames.TETRIS} />
      </div>
    </div>
  );
};
