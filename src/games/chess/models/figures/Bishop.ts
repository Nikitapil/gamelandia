import { Cell } from '../Cell';
import { EChessColors } from '../EChessColors';
import { Figure } from './Figure';
import blackLogo from '../../assets/figure-images/black-bishop.png';
import whiteLogo from '../../assets/figure-images/white-bishop.png';
import { EFigureNames } from '../../helpers/constants';

export class Bishop extends Figure {
  constructor(color: EChessColors, cell?: Cell) {
    super(color, cell);
    this.logo = color === EChessColors.BLACK ? blackLogo : whiteLogo;
    this.name = EFigureNames.BISHOP;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target) || !this.cell) {
      return false;
    }
    return this.cell.isEmptyDiagonal(target);
  }
}
