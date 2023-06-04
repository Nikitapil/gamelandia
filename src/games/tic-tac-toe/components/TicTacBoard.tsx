import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TicBoard } from '../models/TicBoard';
import { TicCell } from '../models/TicCell';
import { TicTacCell } from './TicTacCell';
import styles from '../assets/styles/tictac.module.scss';

interface ITicTacBoardProps {
  board: TicBoard;
  setBoard: (board: TicBoard) => void;
  winner: string;
  setWinner: (winner: string) => void;
  draw: boolean;
  setDraw: (draw: boolean) => void;
}

export const TicTacBoard: FC<ITicTacBoardProps> = ({
  board,
  setBoard,
  winner,
  setWinner,
  draw,
  setDraw
}) => {
  const { t } = useTranslation();

  const clickOnCell = (cell: TicCell) => {
    if (!cell.icon && !winner) {
      const newBoard = cell.click();
      setBoard(newBoard);
      const { isWinner, isDraw } = board.checkIsWinnerOrDraw();
      if (isWinner) {
        setWinner(board.currentPlayer);
      } else if (isDraw) {
        setDraw(true);
      }
    }
  };

  const winnerText = useMemo(() => {
    if (!winner && !draw) {
      return '';
    }
    return winner ? `${t(winner)} ${t('wins')}!!!` : `${t('draw')}!!!`;
  }, [draw, t, winner]);

  return (
    <div className="board-container">
      {winnerText && (
        <h2
          data-testid="winner-text"
          className={styles.tictac__winner}
        >
          {winnerText}
        </h2>
      )}
      <div className={styles['tictac-board']}>
        {!!board.cells.length &&
          board.cells.map((row) =>
            row.map((cell) => (
              <TicTacCell
                clickOnCell={clickOnCell}
                cell={cell}
                key={cell.id}
              />
            ))
          )}
      </div>
    </div>
  );
};
