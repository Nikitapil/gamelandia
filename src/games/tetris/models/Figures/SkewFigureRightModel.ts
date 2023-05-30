import { TetrisBoardModel } from '../TetrisBoardModel';
import { ETetrisColors, SKEW_FIGURE_POSSIBLE_DIRECTIONS } from '../../constants';
import { TetrisFigureModel } from './TetrisFigureModel';
import { TetrisElem } from '../TetrisElem';

export class SkewFigureRightModel extends TetrisFigureModel {
  constructor(board: TetrisBoardModel) {
    super(board, SKEW_FIGURE_POSSIBLE_DIRECTIONS);
    this.color = ETetrisColors.YELLOW;
    this.baseElem = new TetrisElem(this.color, board.getCell(0, 4), this);
    this.createElement();
  }

  get nextCells() {
    if (!this.baseElem) {
      return { right: [], down: [], left: [], up: [] };
    }
    const { y, x } = this.baseElem.cell;
    return {
      right: [],
      left: [],
      up: [
        this.board.getCell(y, x + 1),
        this.board.getCell(y + 1, x),
        this.board.getCell(y + 1, x - 1)
      ],
      down: [
        this.board.getCell(y + 1, x),
        this.board.getCell(y, x - 1),
        this.board.getCell(y - 1, x - 1)
      ]
    };
  }
}
