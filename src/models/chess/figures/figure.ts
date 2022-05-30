import { Colors } from "./../Colors";
import logo from "../../../assets/checkmates/black-king.png";
import { FigureNames } from "../../../constants/chess";
import { Cell } from "../Cell";
export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
      
    if (target.figure?.color === this.color) {
      return false;
    }
    if (
      this.name === FigureNames.KING &&
      target.figure?.name === FigureNames.KING
    ) {
      return false;
    }
    return true;
  }
  moveFigure(target: Cell) {}
}
