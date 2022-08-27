import { TetrisBoardModel } from '../TetrisBoardModel';
import { ETetrisColors } from './../../../constants/tetris';
import { TetrisFigureModel } from './TetrisFigureModel';

export class LFigureModel extends TetrisFigureModel {
    constructor(board: TetrisBoardModel) {
        super(board, []);
        this.color = ETetrisColors.GREEN
    }
}