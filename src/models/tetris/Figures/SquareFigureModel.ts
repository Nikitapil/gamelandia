import { ETetrisColors } from '../../../constants/tetris';
import { TetrisBoardModel } from '../TetrisBoardModel';
import { TetrisFigureModel } from './TetrisFigureModel';
export class SquareFigureModel extends TetrisFigureModel {
    constructor(board: TetrisBoardModel) {
        super(board);
        this.color = ETetrisColors.RED
    }
}