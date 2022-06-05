import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { FigureNames } from "../../constants/chess";
import { Cell } from "../../models/chess/Cell";
import { Bishop } from "../../models/chess/figures/Bishop";
import { Knight } from "../../models/chess/figures/Knight";
import { Queen } from "../../models/chess/figures/Queen";
import { Rook } from "../../models/chess/figures/Rook";
import { Player } from "../../models/chess/Player";
import { ModalContainer } from "../UI/ModalContainer";
import {
  faChessBishop,
  faChessKnight,
  faChessQueen,
  faChessRook,
} from "@fortawesome/free-solid-svg-icons";
import { Board } from "../../models/chess/Board";
interface FiguresModalProps {
  closeModal: () => void;
  swapPlayer: () => void;
  currentPlayer: Player | null;
  cell: Cell;
  board: Board;
}

export const FiguresModal: FC<FiguresModalProps> = ({
  currentPlayer,
  cell,
  swapPlayer,
  closeModal,
  board,
}) => {
  const chooseFigure = (figure: string) => {
    switch (figure) {
      case FigureNames.BISHOP:
        new Bishop(currentPlayer?.color!, cell);
        break;
      case FigureNames.KNIGHT:
        new Knight(currentPlayer?.color!, cell);
        break;
      case FigureNames.QUEEN:
        new Queen(currentPlayer?.color!, cell);
        break;
      case FigureNames.ROOK:
        new Rook(currentPlayer?.color!, cell);
        break;
    }
    board.checkIfKingIsUnderAttack();
    swapPlayer();
    closeModal();
  };

  return (
    <ModalContainer title="Choose new figure" closeModal={closeModal}>
      <div className="figures-container">
        <button
          className="figure-button"
          onClick={() => chooseFigure(FigureNames.BISHOP)}
          data-testid='bishop-btn'
        >
          <FontAwesomeIcon icon={faChessBishop} /> Bishop
        </button>
        <button
          className="figure-button"
          onClick={() => chooseFigure(FigureNames.KNIGHT)}
          data-testid='knight-btn'
        >
          <FontAwesomeIcon icon={faChessKnight} /> Knight
        </button>
        <button
          className="figure-button"
          onClick={() => chooseFigure(FigureNames.QUEEN)}
          data-testid='queen-btn'
        >
          <FontAwesomeIcon icon={faChessQueen} /> Queen
        </button>
        <button
          className="figure-button"
          onClick={() => chooseFigure(FigureNames.ROOK)}
          data-testid='rook-btn'
        >
          <FontAwesomeIcon icon={faChessRook} /> Rook
        </button>
      </div>
    </ModalContainer>
  );
};
