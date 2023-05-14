import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { FigureNames } from '../helpers/constants';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import { ChessCellComponents } from './ChessCellComponents';
import { FiguresModal } from './FiguresModal';
import styles from '../assets/styles/chess.module.scss';

interface ChessBoardComponentProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
  isClickAvailable?: boolean;
}

export const ChessBoardComponent: FC<ChessBoardComponentProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
  isClickAvailable = true
}) => {
  const { t } = useTranslation();

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [pawnCell, setPawnCell] = useState<Cell | null>(null);

  const updateSelectedCell = (cell: Cell | null) => {
    setSelectedCell(cell);
    board.highLightCells(cell);
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  const onClickCell = (cell: Cell) => {
    if (!isClickAvailable) {
      return;
    }

    const canMove = selectedCell !== cell && selectedCell?.figure?.canMove(cell);
    if (canMove) {
      const move = selectedCell?.moveFigure(cell);
      board.checkIfKingIsUnderAttack();
      updateSelectedCell(null);

      if (move) {
        if (cell.figure?.name === FigureNames.PAWN && cell.figure?.checkIfEndOfBoard()) {
          setPawnCell(cell);
          return;
        }
        swapPlayer();
      }
    } else if (cell.figure && cell.figure.color === currentPlayer?.color) {
      updateSelectedCell(cell);
    }
  };

  const closeFiguresModal = () => {
    setPawnCell(null);
  };

  return (
    <div className={styles['chess-board']}>
      <div className={styles['game-information']}>
        <h3 className={styles['current-player']}>
          {t('current_player')}: {t(currentPlayer?.color || '')}
        </h3>
        <p className={styles.king__attacked}>{t(board.underAttackMessage)}</p>
      </div>
      <div className={styles.board}>
        {board.cells.map((row) => (
          <React.Fragment key={uuidv4()}>
            {row.map((cell) => (
              <ChessCellComponents
                click={onClickCell}
                key={cell.id}
                cell={cell}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <FiguresModal
        board={board}
        closeModal={closeFiguresModal}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        cell={pawnCell}
        isOpened={!!pawnCell}
      />
    </div>
  );
};
