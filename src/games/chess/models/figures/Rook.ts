import { FigureNames } from '../../helpers/constants';
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure } from './figure';
import blackLogo from '../../assets/figure-images/black-rook.png';
import whiteLogo from '../../assets/figure-images/white-rook.png';

export class Rook extends Figure {
  constructor(color: Colors, cell?: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.ROOK;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    return (
      this.cell!.isEmptyHorizontal(target) || this.cell!.isEmptyVertical(target)
    );
  }
}