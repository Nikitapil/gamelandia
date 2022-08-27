import { ETetrisColors } from "../../constants/tetris";
import { TetrisFigureModel } from "./Figures/TetrisFigureModel";
import { TetrisCellModel } from "./TetrisCellModel";

export class TetrisElem {
    color: ETetrisColors;
    cell: TetrisCellModel
    figure:TetrisFigureModel
    constructor(color: ETetrisColors, cell: TetrisCellModel, figure:TetrisFigureModel ) {
        this.color = color
        this.cell = cell
        this.cell.elem = this
        this.figure = figure
    }

    move(cell: TetrisCellModel) {
        this.destroyElem()
        this.cell = cell
        this.cell.elem = this

    }

    destroyElem() {
        this.cell.elem = null
    }

    canMove(cell: TetrisCellModel| undefined) {
        if (!cell) {
            return false
        }
        return !cell?.elem || cell.elem.figure === this.figure
    }
}