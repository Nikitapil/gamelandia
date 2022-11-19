import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/numbersGame.module.scss';
import { NumbersBoardModel } from '../../models/2048/NumbersBoardModel';
import { NumbersElem } from './NumbersElem';
import { ENumbersDirections } from '../../constants/2048';
import { AppButton } from '../UI/AppButton';

export const NumbersBoard = () => {
  const [board, setBoard] = useState(new NumbersBoardModel());
  const boardRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

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

  return (
    <div className={styles['board-container']}>
      <AppButton text={t('new_game')} color="success" onClick={newGame} />
      <div
        className={styles.board}
        tabIndex={0}
        ref={boardRef}
        onKeyDown={keyPressHandler}
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
