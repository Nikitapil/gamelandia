import { ETetrisColors, ETetrisDirections, T_FIGURE_POSSIBLE_DIRECTIONS } from "../../../constants/tetris";
import { TetrisBoardModel } from "../TetrisBoardModel";
import { TetrisElem } from "../TetrisElem";
import { TetrisFigureModel } from "./TetrisFigureModel";

export class TFigureModel extends TetrisFigureModel {
    
  constructor(board: TetrisBoardModel) {
    super(board, T_FIGURE_POSSIBLE_DIRECTIONS);
    this.color = ETetrisColors.BLUE;
    this.baseElem = new TetrisElem(this.color, board.getCell(1, 4), this);
    this.createElement()
  }

  

  createUpElem() {
    const y = this.baseElem!.cell.y;
    const x = this.baseElem!.cell.x;
    const nextCells = [this.board.getCell(y - 1, x), this.board.getCell(y, x - 1), this.board.getCell(y, x + 1)] 
    if (nextCells.some(cell => !!cell.elem && cell.elem.figure !== this)) {
        return
    }
    this.destroyNobaseElems();
    this.updateElems(nextCells)
  }

  createDownElem() {
    const y = this.baseElem!.cell.y;
    const x = this.baseElem!.cell.x;
    const nextCells = [this.board.getCell(y + 1, x), this.board.getCell(y, x - 1), this.board.getCell(y, x + 1)]
    if (nextCells.some(cell => !!cell.elem && cell.elem.figure !== this)) {
        return
    }
    this.destroyNobaseElems();
    this.updateElems(nextCells)
  }

  createRightElement() {
    const y = this.baseElem!.cell.y;
    const x = this.baseElem!.cell.x;
    const nextCells = [this.board.getCell(y, x + 1), this.board.getCell(y - 1, x), this.board.getCell(y + 1, x)]
    if (nextCells.some(cell => !!cell.elem && cell.elem.figure !== this)) {
        return
    }
    this.destroyNobaseElems();
    this.updateElems(nextCells)
  }

  createLeftElement() {
    const y = this.baseElem!.cell.y;
    const x = this.baseElem!.cell.x;
    const nextCells = [this.board.getCell(y, x - 1), this.board.getCell(y - 1, x), this.board.getCell(y + 1, x)]
    if (nextCells.some(cell => !!cell.elem && cell.elem.figure !== this)) {
        return
    }
    this.destroyNobaseElems();
    this.updateElems(nextCells)
  }
}
