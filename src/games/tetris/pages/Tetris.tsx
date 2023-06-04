import React, { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TetrisBoard } from '../components/TetrisBoard';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { TetrisBoardModel } from '../models/TetrisBoardModel';
import style from '../assets/styles/tetris.module.scss';
import { isMobile } from '../../../utils/helpers';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { useCreateScore } from '../../../score/hooks/useCreateScore';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';
import { EGamesNames } from '../../constants';
import { MobileButtons } from '../../components/MobileButtons/MobileButtons';
import { GameWithScore } from '../../components/GameWithScore/GameWithScore';

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

  const updateBoard = () => {
    const newBoard = board.copyBoard();
    setBoard(newBoard);
  };

  const onKeyPress = (e: KeyboardEvent | null, btnName?: string) => {
    if (e?.code === 'ArrowRight' || btnName === 'right') {
      board.currentFigure?.moveRight();
      updateBoard();
    }
    if (e?.code === 'ArrowLeft' || btnName === 'left') {
      board.currentFigure?.moveLeft();
      updateBoard();
    }
    if (e?.code === 'ArrowDown' || btnName === 'down') {
      board.currentFigure?.moveDown();
      updateBoard();
    }
    if (e?.code === 'ArrowUp' || btnName === 'up') {
      board.currentFigure?.changeDirection();
      updateBoard();
    }
  };

  const startMoving = (timer = 1000) => {
    if (figureInterval.current) {
      clearInterval(figureInterval.current);
    }

    board.startGame();
    updateBoard();

    figureInterval.current = setInterval(() => {
      if (board.currentFigure!.elems.length < 2) {
        gameOver();
      }
      const move = board.currentFigure?.moveDown();
      if (!move) {
        if (board.currentFigure!.elems.some((elem) => elem.cell.y <= 1) || !board.currentFigure) {
          gameOver();
        }
        const addScore = board.clearRows();
        updateBoard();

        setScore((prev) => prev + addScore * 10);
        const newTimer = addScore && timer > 400 ? timer - addScore * 4 : timer;
        startMoving(newTimer);
      }
      updateBoard();
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

  return (
    <div
      className={`container ${style['tetris-container']}`}
      onKeyDown={onKeyPress}
      ref={gameRef}
      tabIndex={0}
    >
      <h2 className={`page-title ${style.title}`}>
        <span className={style['color-blue']}>T</span>
        <span className={style['color-green']}>e</span>
        <span className={style['color-yellow']}>t</span>
        <span className={style['color-orange']}>r</span>
        <span className={style['color-red']}>i</span>s
      </h2>
      {isGameOver && <p className={style['game-over']}>Game over</p>}
      <div className={style.controlls}>
        {isShowStartBtn && (
          <AppButton
            size="sm"
            color="success"
            onClick={startGame}
            type="button"
            customClass={style['game-btn']}
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
            customClass={style['game-btn']}
          >
            {t('new_game')}
          </AppButton>
        )}
        <p className={style.score}>
          {t('score')}: {score}
        </p>
      </div>
      <GameWithScore
        game={EGamesNames.TETRIS}
        user={user}
      >
        <TetrisBoard board={board} />
        {isShowMobileBtns && <MobileButtons onClick={onKeyPress} />}
      </GameWithScore>
    </div>
  );
};
