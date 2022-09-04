import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FigureNames } from "../../constants/chess";
import { Board } from "../../models/chess/Board";
import { Cell } from "../../models/chess/Cell";
import { Player } from "../../models/chess/Player";
import { ChessCellComponents } from "./ChessCellComponents";
import { FiguresModal } from "./FiguresModal";

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
  isClickAvailable = true,
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const highLightCells = () => {
    board.highLightCells(selectedCell);
    updateBoard();
  };

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
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
          {t("current_player")}: {t(currentPlayer?.color || "")}
        </h3>
        <p className="king__attacked">{board.underAttackMessage}</p>
      </div>
      <div className="board">
        {board.cells.map((row, idx) => (
          <React.Fragment key={idx}>
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
      {pawnCell && (
        <FiguresModal
          board={board}
          closeModal={closeFiguresModal}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
          cell={pawnCell}
        />
      )}
    </div>
  );
};
