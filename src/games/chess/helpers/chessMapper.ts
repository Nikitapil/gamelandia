import { chunk } from 'lodash';
import { EFigureNames } from './constants';
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

const figureToFirebase = ({ name, color }: Figure) => ({ name, color });

const mapCellsToFirebase = (cells: Cell[][]) => {
  return cells.flat().map((cell) => ({
    x: cell.x,
    y: cell.y,
    color: cell.color,
    figure: cell.figure ? figureToFirebase(cell.figure) : null
  }));
};

const figuresToFirebase = (figures: Figure[]) => {
  return figures.map((fig) => figureToFirebase(fig));
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
  switch (figureData.name) {
    case EFigureNames.BISHOP:
      return new Bishop(figureData.color, cell);
    case EFigureNames.KING:
      return new King(figureData.color, cell);
    case EFigureNames.KNIGHT:
      return new Knight(figureData.color, cell);
    case EFigureNames.PAWN:
      return new Pawn(figureData.color, cell);
    case EFigureNames.QUEEN:
      return new Queen(figureData.color, cell);
    case EFigureNames.ROOK:
      return new Rook(figureData.color, cell);
    default:
      throw new Error('Unknown figure name');
  }
};

export const mapBoardFromFireBase = (board: IFirebaseChessBoard) => {
  const newBoard = new Board();
  newBoard.cells = chunk(
    board.cells.map((cell) => {
      const newCell = new Cell(newBoard, cell.x, cell.y, cell.color, null);
      if (cell.figure) {
        const figure = createFigure(cell.figure, newCell);
        if (figure?.name === EFigureNames.KING) {
          newBoard.kings[figure.color] = figure;
        }
      }
      return newCell;
    }),
    8
  );
  newBoard.lostBlackFigures = board.lostBlackFigures.map((fig) => createFigure(fig));
  newBoard.lostWhightFigures = board.lostWhightFigures.map((fig) => createFigure(fig));
  newBoard.underAttackMessage = board.underAttackMessage;
  return newBoard;
};
