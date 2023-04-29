import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSwipeable } from 'react-swipeable';
import styles from '../../styles/numbersGame.module.scss';
import { NumbersBoardModel } from '../../models/2048/NumbersBoardModel';
import { NumbersElem } from './NumbersElem';
import { ENumbersDirections } from '../../constants/2048';
import { AppButton } from '../UI/AppButton';
import { isMobile } from '../../utils/helpers';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { authSelector } from '../../store/selectors';
import { EGamesNames } from '../../constants/games';
import { useCreateScore } from '../../hooks/useCreateScore';

export const NumbersBoard = () => {
  const [board, setBoard] = useState(new NumbersBoardModel());
  const boardRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { user } = useAppSelector(authSelector);
  const createScore = useCreateScore();

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
    if (user) {
      await createScore({
        value: board.lastScore,
        gameName: EGamesNames.NUMBERS
      });
    }
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
            <h2>Game Over!!!</h2>
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
