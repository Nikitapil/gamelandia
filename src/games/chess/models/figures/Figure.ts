import { v4 as uuidv4 } from 'uuid';
import { EChessColors } from '../EChessColors';
import logo from '../../assets/figure-images/black-king.png';
import { EFigureNames } from '../../helpers/constants';
import { Cell } from '../Cell';

export abstract class Figure {
  color: EChessColors;

  logo: typeof logo;

  cell: Cell | null;

  name: EFigureNames;

  id: number;

  protected constructor(color: EChessColors, cell?: Cell) {
    this.color = color;
    if (cell) {
      this.cell = cell;
      this.cell.figure = this;
    } else {
      this.cell = null;
    }
    this.logo = '';
    this.name = EFigureNames.FIGURE;
    this.id = uuidv4();
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }
    return !(this.name === EFigureNames.KING && target.figure?.name === EFigureNames.KING);
  }

  checkIfEndOfBoard() {
    return false;
  }
}
