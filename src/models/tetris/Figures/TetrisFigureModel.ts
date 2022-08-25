import { TetrisBoardModel } from './../TetrisBoardModel';
import { TetrisElem } from './../TetrisElem';
import { ETetrisColors } from "../../../constants/tetris";

export abstract class TetrisFigureModel {
    color: ETetrisColors = ETetrisColors.BLUE
    elems: TetrisElem[] = []
    board: TetrisBoardModel
    id: number;
    constructor(board: TetrisBoardModel) {
        this.id = Math.random()
        this.board = board
    }
}