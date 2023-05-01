import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { FigureNames } from '../helpers/constants';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import { ChessCellComponents } from './ChessCellComponents';
import { FiguresModal } from './FiguresModal';

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
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [pawnCell, setPawnCell] = useState<Cell | null>(null);
  const { t } = useTranslation();
  const click = (cell: Cell) => {
    if (!isClickAvailable) {
      return;
    }
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      const move = selectedCell.moveFigure(cell);
      board.checkIfKingIsUnderAttack();
      setSelectedCell(null);
      if (move) {
        if (
          cell.figure?.name === FigureNames.PAWN &&
          cell.figure?.checkIfEndOfBoard()
        ) {
          setPawnCell(cell);
          return;
        }
        swapPlayer();
      }
    } else if (cell.figure && cell.figure.color === currentPlayer?.color) {
      setSelectedCell(cell);
    }
  };

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const highLightCells = () => {
    board.highLightCells(selectedCell);
    updateBoard();
  };

  const closeFiguresModal = () => {
    setPawnCell(null);
  };

  useEffect(() => {
    highLightCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell]);

  return (
    <div className="chess-board">
      <div className="game-information">
        <h3 className="current-player">
          {t('current_player')}: {t(currentPlayer?.color || '')}
        </h3>
        <p className="king__attacked">{board.underAttackMessage}</p>
      </div>
      <div className="board">
        {board.cells.map((row) => (
          <React.Fragment key={uuidv4()}>
            {row.map((cell) => (
              <ChessCellComponents
                click={click}
                key={cell.id}
                cell={cell}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                }
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