import { TetrisBoardModel } from '../TetrisBoardModel';
import { ETetrisColors, SKEW_FIGURE_POSSIBLE_DIRECTIONS } from '../../../constants/tetris';
import { TetrisFigureModel } from './TetrisFigureModel';
import { TetrisElem } from '../TetrisElem';

export class SkewFigureLeftModel extends TetrisFigureModel {
    constructor(board: TetrisBoardModel) {
        super(board, SKEW_FIGURE_POSSIBLE_DIRECTIONS);
        this.color = ETetrisColors.WHITE
        this.baseElem = new TetrisElem(this.color, board.getCell(0, 4), this)
        this.createElement()
    }
    get nextCells() {
        const y = this.baseElem!.cell.y;
        const x = this.baseElem!.cell.x;
         return {
            right: [],
            left: [],
            up: [this.board.getCell(y, x-1), this.board.getCell(y+1, x), this.board.getCell(y+1, x + 1)],
            down: [this.board.getCell(y+1, x), this.board.getCell(y, x+1), this.board.getCell(y-1, x + 1)]
        }
      }
}