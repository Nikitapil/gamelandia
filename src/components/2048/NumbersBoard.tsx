import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import styles from '../../styles/numbersGame.module.scss';
import { NumbersBoardModel } from '../../models/2048/NumbersBoardModel';
import { NumbersElem } from './NumbersElem';
import { ENumbersDirections } from '../../constants/2048';
import { AppButton } from '../UI/AppButton';
import { EGamesWithScoreBoard } from '../../types/scoreTypes';
import { ScoreService } from '../../services/scoreService';
import { fetchBoardScores } from '../../redux/score/scoreActions';
import { isMobile } from '../../utils/helpers';

export const NumbersBoard = () => {
  const [board, setBoard] = useState(new NumbersBoardModel());
  const boardRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const game = EGamesWithScoreBoard.NUMBERS;
  const dispatch = useDispatch();

  const isMobileLayout = useMemo(() => {
    return isMobile();
  }, []);

  const newGame = () => {
    boardRef.current?.focus();
    const newBoard = new NumbersBoardModel();
    newBoard.createCells();
    newBoard.createElem();
    newBoard.createElem();
    setBoard(newBoard);
  };

  useEffect(() => {
    newGame();
  }, []);

  const updateScore = async () => {
    await ScoreService.setRecord(board.lastScore, game);
    dispatch(fetchBoardScores(EGamesWithScoreBoard.NUMBERS));
  };

  useEffect(() => {
    if (board.isGameOver) {
      updateScore();
    }
  }, [board.isGameOver]);

  const move = (direction: ENumbersDirections) => {
    board.move(direction);
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (board.isGameOver) {
      return;
    }
    if (e.code === 'ArrowUp') {
      move(ENumbersDirections.TOP);
    }
    if (e.code === 'ArrowDown') {
      move(ENumbersDirections.BOTTOM);
    }
    if (e.code === 'ArrowLeft') {
      move(ENumbersDirections.LEFT);
    }
    if (e.code === 'ArrowRight') {
      move(ENumbersDirections.RIGHT);
    }
  };
  const swipeHandlers = isMobileLayout
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useSwipeable({
        onSwipedUp: () => move(ENumbersDirections.TOP),
        onSwipedDown: () => move(ENumbersDirections.BOTTOM),
        onSwipedLeft: () => move(ENumbersDirections.LEFT),
        onSwipedRight: () => move(ENumbersDirections.RIGHT),
        preventScrollOnSwipe: true,
        delta: 5
      })
    : {};

  return (
    <div className={styles['board-container']}>
      <AppButton text={t('new_game')} color="success" onClick={newGame} />
      <div
        className={styles.board}
        tabIndex={0}
        ref={boardRef}
        onKeyDown={keyPressHandler}
        {...swipeHandlers}
      >
        {board.isGameOver && (
          <div className={styles['game-over']}>
            <h2>Game Over !!!</h2>
            <p>Score: {board.lastScore}</p>
            <AppButton text={t('new_game')} color="success" onClick={newGame} />
          </div>
        )}
        {board.cells.map((row) =>
          row.map((cell) => <div key={cell.id} className={styles.cell} />)
        )}
        {board.elems.map((elem) => (
          <NumbersElem elem={elem} key={elem.id} />
        ))}
      </div>
    </div>
  );
};
