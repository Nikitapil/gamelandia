import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSwipeable } from 'react-swipeable';
import styles from '../assets/styles/numbers.module.scss';
import { NumbersBoardModel } from '../models/NumbersBoardModel';
import { NumbersElem } from './NumbersElem';
import { ENumbersDirections } from '../constants';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { isMobile } from '../../../utils/helpers';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';
import { useCreateScore } from '../../../score/hooks/useCreateScore';
import { EGamesNames } from '../../constants';

export const NumbersBoard = () => {
  const { t } = useTranslation();

  const { user } = useAppSelector(authSelector);
  const createScore = useCreateScore();

  const [board, setBoard] = useState(new NumbersBoardModel());
  const boardRef = useRef<HTMLDivElement>(null);

  const isMobileLayout = useMemo(() => {
    return isMobile();
  }, []);

  const newGame = () => {
    boardRef.current?.focus();
    const newBoard = new NumbersBoardModel();
    newBoard.initNewGame();
    setBoard(newBoard);
  };

  const updateScore = async () => {
    if (user) {
      await createScore({
        value: board.lastScore,
        gameName: EGamesNames.NUMBERS
      });
    }
  };

  const move = async (direction: ENumbersDirections) => {
    board.move(direction);
    if (board.isGameOver) {
      await updateScore();
    }
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  const keyPressHandler = async (e: React.KeyboardEvent) => {
    if (board.isGameOver) {
      return;
    }
    if (e.code === 'ArrowUp') {
      await move(ENumbersDirections.TOP);
    }
    if (e.code === 'ArrowDown') {
      await move(ENumbersDirections.BOTTOM);
    }
    if (e.code === 'ArrowLeft') {
      await move(ENumbersDirections.LEFT);
    }
    if (e.code === 'ArrowRight') {
      await move(ENumbersDirections.RIGHT);
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

  useEffect(() => {
    newGame();
  }, []);

  return (
    <div className={styles['board-container']}>
      <AppButton
        text={t('new_game')}
        color="success"
        onClick={newGame}
      />
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
            <AppButton
              text={t('new_game')}
              color="success"
              onClick={newGame}
            />
          </div>
        )}
        {board.cells.map((row) =>
          row.map((cell) => (
            <div
              key={cell.id}
              className={styles.cell}
            />
          ))
        )}
        {board.elems.map((elem) => (
          <NumbersElem
            elem={elem}
            key={elem.id}
          />
        ))}
      </div>
    </div>
  );
};
