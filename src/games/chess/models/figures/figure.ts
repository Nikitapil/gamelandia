import { v4 as uuidv4 } from 'uuid';
import { Colors } from '../Colors';
import logo from '../../assets/figure-images/black-king.png';
import { FigureNames } from '../../helpers/constants';
import { Cell } from '../Cell';

export class Figure {
  color: Colors;

  logo: typeof logo | null;

  cell: Cell | null;

  name: FigureNames;

  id: number;

  constructor(color: Colors, cell?: Cell) {
    this.color = color;
    if (cell) {
      this.cell = cell;
      this.cell.figure = this;
    } else {
      this.cell = null;
    }
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = uuidv4();
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }
    return !(this.name === FigureNames.KING && target.figure?.name === FigureNames.KING);
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  moveFigure(target: Cell) {}

  // eslint-disable-next-line class-methods-use-this
  checkIfEndOfBoard() {
    return false;
  }
}
