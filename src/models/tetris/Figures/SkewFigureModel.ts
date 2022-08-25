import { TetrisBoardModel } from './../TetrisBoardModel';
import { ETetrisColors } from '../../../constants/tetris';
import { TetrisFigureModel } from './TetrisFigureModel';

export class SkewFigureModel extends TetrisFigureModel {
    constructor(board: TetrisBoardModel) {
        super(board);
        this.color = ETetrisColors.ORANGE
    }
}