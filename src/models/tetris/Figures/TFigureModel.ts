import { ETetrisColors } from '../../../constants/tetris';
import { TetrisBoardModel } from '../TetrisBoardModel';
import { TetrisFigureModel } from './TetrisFigureModel';

export class TFigureModel extends TetrisFigureModel {
    constructor(board: TetrisBoardModel) {
        super(board)
        this.color = ETetrisColors.BLUE
    }
}