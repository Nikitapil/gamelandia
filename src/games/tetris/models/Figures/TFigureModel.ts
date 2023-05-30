import { ETetrisColors, T_FIGURE_POSSIBLE_DIRECTIONS } from '../../constants';
import { TetrisBoardModel } from '../TetrisBoardModel';
import { TetrisElem } from '../TetrisElem';
import { TetrisFigureModel } from './TetrisFigureModel';

export class TFigureModel extends TetrisFigureModel {
  constructor(board: TetrisBoardModel) {
    super(board, T_FIGURE_POSSIBLE_DIRECTIONS);
    this.color = ETetrisColors.BLUE;
    this.baseElem = new TetrisElem(this.color, board.getCell(1, 4), this);
    this.createElement();
  }

  get nextCells() {
    if (!this.baseElem) {
      return { right: [], down: [], left: [], up: [] };
    }
    const { y, x } = this.baseElem.cell;
    return {
      right: [
        this.board.getCell(y, x + 1),
        this.board.getCell(y - 1, x),
        this.board.getCell(y + 1, x)
      ],
      left: [
        this.board.getCell(y, x - 1),
        this.board.getCell(y - 1, x),
        this.board.getCell(y + 1, x)
      ],
      up: [
        this.board.getCell(y - 1, x),
        this.board.getCell(y, x - 1),
        this.board.getCell(y, x + 1)
      ],
      down: [
        this.board.getCell(y + 1, x),
        this.board.getCell(y, x - 1),
        this.board.getCell(y, x + 1)
      ]
    };
  }
}
