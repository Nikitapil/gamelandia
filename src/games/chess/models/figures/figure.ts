import { v4 as uuidv4 } from 'uuid';
import { EChessColors } from '../EChessColors';
import logo from '../../assets/figure-images/black-king.png';
import { EFigureNames } from '../../helpers/constants';
import { Cell } from '../Cell';

export class Figure {
  color: EChessColors;

  logo: typeof logo | null;

  cell: Cell | null;

  name: EFigureNames;

  id: number;

  constructor(color: EChessColors, cell?: Cell) {
    this.color = color;
    if (cell) {
      this.cell = cell;
      this.cell.figure = this;
    } else {
      this.cell = null;
    }
    this.logo = null;
    this.name = EFigureNames.FIGURE;
    this.id = uuidv4();
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }
    return !(this.name === EFigureNames.KING && target.figure?.name === EFigureNames.KING);
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  moveFigure(target: Cell) {}

  // eslint-disable-next-line class-methods-use-this
  checkIfEndOfBoard() {
    return false;
  }
}
