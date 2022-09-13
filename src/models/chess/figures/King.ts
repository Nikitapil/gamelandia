import { FigureNames } from '../../../constants/chess';
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure } from './figure';
import blackLogo from '../../../assets/checkmates/black-king.png';
import whiteLogo from '../../../assets/checkmates/white-king.png';

export class King extends Figure {
  constructor(color: Colors, cell?: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    this.cell!.isUnderAttack();
    const dx = Math.abs(this.cell!.x - target.x);
    const dy = Math.abs(this.cell!.y - target.y);
    return dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0);
  }
}
