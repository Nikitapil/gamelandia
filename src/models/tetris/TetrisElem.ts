import { ETetrisColors } from "../../constants/tetris";
import { TetrisCellModel } from "./TetrisCellModel";

export class TetrisElem {
    color: ETetrisColors;
    cell: TetrisCellModel
    constructor(color: ETetrisColors, cell: TetrisCellModel) {
        this.color = color
        this.cell = cell
        this.cell.elem = this
    }
}