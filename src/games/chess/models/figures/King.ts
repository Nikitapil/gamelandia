import { EFigureNames } from '../../helpers/constants';
import { Cell } from '../Cell';
import { EChessColors } from '../EChessColors';
import { Figure } from './figure';
import blackLogo from '../../assets/figure-images/black-king.png';
import whiteLogo from '../../assets/figure-images/white-king.png';

export class King extends Figure {
  constructor(color: EChessColors, cell?: Cell) {
    super(color, cell);
    this.logo = color === EChessColors.BLACK ? blackLogo : whiteLogo;
    this.name = EFigureNames.KING;
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
