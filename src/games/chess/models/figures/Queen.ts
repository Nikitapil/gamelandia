import { EFigureNames } from '../../helpers/constants';
import { Cell } from '../Cell';
import { EChessColors } from '../EChessColors';
import { Figure } from './Figure';
import blackLogo from '../../assets/figure-images/black-queen.png';
import whiteLogo from '../../assets/figure-images/white-queen.png';

export class Queen extends Figure {
  constructor(color: EChessColors, cell?: Cell) {
    super(color, cell);
    this.logo = color === EChessColors.BLACK ? blackLogo : whiteLogo;
    this.name = EFigureNames.QUEEN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target) || !this.cell) {
      return false;
    }
    return (
      this.cell.isEmptyVertical(target) ||
      this.cell.isEmptyHorizontal(target) ||
      this.cell.isEmptyDiagonal(target)
    );
  }
}
