import { ETetrisColors, STRAIGHT_FIGURE_POSSIBLE_DIRECTIONS } from '../../../constants/tetris';
import { TetrisBoardModel } from '../TetrisBoardModel';
import { TetrisElem } from '../TetrisElem';
import { TetrisFigureModel } from './TetrisFigureModel';

export class StraightFigureModel extends TetrisFigureModel {
    constructor(board: TetrisBoardModel) {
        super(board, STRAIGHT_FIGURE_POSSIBLE_DIRECTIONS);
        this.color = ETetrisColors.BLACK
        this.baseElem = new TetrisElem(this.color, board.getCell(1, 4), this)
        this.createElement()
    }

    get nextCells() {
        const y = this.baseElem!.cell.y;
        const x = this.baseElem!.cell.x;
         return {
            right: [],
            left: [],
            up: [this.board.getCell(y-1, x), this.board.getCell(y+1, x), this.board.getCell(y+2, x)],
            down: [this.board.getCell(y, x-1), this.board.getCell(y, x+1), this.board.getCell(y, x + 2)]
        }
      }
}