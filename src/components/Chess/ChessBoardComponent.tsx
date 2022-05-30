import React, { FC, useEffect, useState } from "react";
import { Board } from "../../models/chess/Board";
import { Cell } from "../../models/chess/Cell";
import { Player } from "../../models/chess/Player";
import { ChessCellComponents } from "./ChessCellComponents";

interface ChessBoardComponentProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void
}

export const ChessBoardComponent: FC<ChessBoardComponentProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const click = (cell: Cell) => {
    if(selectedCell && selectedCell !==cell && selectedCell.figure?.canMove(cell)) {
      const move = selectedCell.moveFigure(cell)
      board.checkIfKingIsUnderAttack()
      setSelectedCell(null)
      if(move) {
        swapPlayer()
      }
    }

    else if(cell.figure && cell.figure.color === currentPlayer?.color) {
      setSelectedCell(cell);
    }

  };

  const highLightCells = () => {
    board.highLightCells(selectedCell)
    updateBoard()
  }

  const updateBoard = () => {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  useEffect(() => {
    highLightCells()
  }, [selectedCell])

  return (
    <div>
      <div className="game-information">
        <h3 className="current-player">Current Player: {currentPlayer?.color}</h3>
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
    </div>
  );
};
