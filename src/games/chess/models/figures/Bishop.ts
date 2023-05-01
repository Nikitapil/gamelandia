import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure } from './figure';
import blackLogo from '../../assets/figure-images/black-bishop.png';
import whiteLogo from '../../assets/figure-images/white-bishop.png';
import { FigureNames } from '../../helpers/constants';

export class Bishop extends Figure {
  constructor(color: Colors, cell?: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.BISHOP;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    return this.cell!.isEmptyDiagonal(target);
  }
}
