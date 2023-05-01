import {
  ETetrisColors,
  SQUARE_FIGURE_POSSIBLE_DIRECTIONS
} from '../../constants';
import { TetrisBoardModel } from '../TetrisBoardModel';
import { TetrisElem } from '../TetrisElem';
import { TetrisFigureModel } from './TetrisFigureModel';

export class SquareFigureModel extends TetrisFigureModel {
  constructor(board: TetrisBoardModel) {
    super(board, SQUARE_FIGURE_POSSIBLE_DIRECTIONS);
    this.color = ETetrisColors.RED;
    this.baseElem = new TetrisElem(this.color, board.getCell(0, 4), this);
    this.createElement();
  }

  get nextCells() {
    const { y } = this.baseElem!.cell;
    const { x } = this.baseElem!.cell;
    return {
      right: [],
      left: [],
      up: [
        this.board.getCell(y, x + 1),
        this.board.getCell(y + 1, x),
        this.board.getCell(y + 1, x + 1)
      ],
      down: []
    };
  }
}
