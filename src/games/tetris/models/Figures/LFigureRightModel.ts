import { TetrisBoardModel } from '../TetrisBoardModel';
import { TetrisElem } from '../TetrisElem';
import { ETetrisColors, L_FIGURE_POSSIBLE_DIRECTIONS } from '../../constants';
import { TetrisFigureModel } from './TetrisFigureModel';

export class LFigureRightModel extends TetrisFigureModel {
  constructor(board: TetrisBoardModel) {
    super(board, L_FIGURE_POSSIBLE_DIRECTIONS);
    this.color = ETetrisColors.ORANGE;
    this.baseElem = new TetrisElem(this.color, board.getCell(2, 4), this);
    this.createElement();
  }

  get nextCells() {
    if (!this.baseElem) {
      return { right: [], down: [], left: [], up: [] };
    }
    const { y, x } = this.baseElem.cell;
    return {
      right: [
        this.board.getCell(y - 1, x),
        this.board.getCell(y, x + 1),
        this.board.getCell(y, x + 2)
      ], // done
      left: [
        this.board.getCell(y + 1, x),
        this.board.getCell(y, x - 1),
        this.board.getCell(y, x - 2)
      ],
      up: [
        this.board.getCell(y, x - 1),
        this.board.getCell(y - 1, x),
        this.board.getCell(y - 2, x)
      ], // done
      down: [
        this.board.getCell(y, x + 1),
        this.board.getCell(y + 1, x),
        this.board.getCell(y + 2, x)
      ] // done
    };
  }
}
