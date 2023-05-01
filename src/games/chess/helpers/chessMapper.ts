import { chunk } from 'lodash';
import { FigureNames } from './constants';
import { IFirebaseChessBoard, IFireBaseChessFigure } from './types';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Bishop } from '../models/figures/Bishop';
import { Figure } from '../models/figures/figure';
import { King } from '../models/figures/King';
import { Knight } from '../models/figures/Knight';
import { Pawn } from '../models/figures/Pawn';
import { Queen } from '../models/figures/Queen';
import { Rook } from '../models/figures/Rook';

const mapCellsToFirebase = (cells: Cell[][]) => {
  return cells.flat().map((cell) => ({
    x: cell.x,
    y: cell.y,
    color: cell.color,
    figure: cell.figure
      ? { name: cell.figure?.name, color: cell.figure?.color }
      : null
  }));
};

const figuresToFirebase = (figures: Figure[]) => {
  return figures.map((fig) => ({ name: fig.name, color: fig.color }));
};

export const chessBoardToFirebaseMapper = (board: Board) => {
  return {
    cells: mapCellsToFirebase(board.cells),
    lostBlackFigures: figuresToFirebase(board.lostBlackFigures),
    lostWhightFigures: figuresToFirebase(board.lostWhightFigures),
    underAttackMessage: board.underAttackMessage
  };
};

const createFigure = (figureData: IFireBaseChessFigure, cell?: Cell) => {
  if (figureData.name === FigureNames.BISHOP) {
    return new Bishop(figureData.color, cell);
  }
  if (figureData.name === FigureNames.KING) {
    return new King(figureData.color, cell);
  }
  if (figureData.name === FigureNames.KNIGHT) {
    return new Knight(figureData.color, cell);
  }
  if (figureData.name === FigureNames.PAWN) {
    return new Pawn(figureData.color, cell);
  }
  if (figureData.name === FigureNames.QUEEN) {
    return new Queen(figureData.color, cell);
  }
  if (figureData.name === FigureNames.ROOK) {
    return new Rook(figureData.color, cell);
  }
};

export const mapBoardFromFireBase = (board: IFirebaseChessBoard) => {
  const newBoard = new Board();
  newBoard.cells = chunk(
    board.cells.map((cell) => {
      const newCell = new Cell(newBoard, cell.x, cell.y, cell.color, null);
      if (cell.figure) {
        const figure = createFigure(cell.figure, newCell);
        if (figure?.name === FigureNames.KING) {
          newBoard.kings[figure.color] = figure;
        }
      }
      return newCell;
    }),
    8
  );
  newBoard.lostBlackFigures = board.lostBlackFigures.map(
    (fig) => createFigure(fig)!
  );
  newBoard.lostWhightFigures = board.lostWhightFigures.map(
    (fig) => createFigure(fig)!
  );
  newBoard.underAttackMessage = board.underAttackMessage;
  return newBoard;
};
