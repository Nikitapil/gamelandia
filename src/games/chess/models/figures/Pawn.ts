import { FigureNames } from '../../helpers/constants';
import { Cell } from '../Cell';
import { EChessColors } from '../EChessColors';
import { Figure } from './figure';
import blackLogo from '../../assets/figure-images/black-pawn.png';
import whiteLogo from '../../assets/figure-images/white-pawn.png';

export class Pawn extends Figure {
  constructor(color: EChessColors, cell?: Cell) {
    super(color, cell);
    this.logo = color === EChessColors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const direction = this.cell!.figure?.color === EChessColors.BLACK ? 1 : -1;
    const firestStepDirection = this.cell!.figure?.color === EChessColors.BLACK ? 2 : -2;
    if (
      (target.y === this.cell!.y + direction ||
        (this.isFirstStep && target.y === this.cell!.y + firestStepDirection)) &&
      target.x === this.cell!.x &&
      this.cell!.board.getCell(target.x, target.y).isEmpty() &&
      this.cell!.isEmptyVertical(target)
    ) {
      return true;
    }
    return (
      target.y === this.cell!.y + direction &&
      (target.x === this.cell!.x + 1 || target.x === this.cell!.x - 1) &&
      this.cell!.isEnemy(target)
    );
  }

  checkIfEndOfBoard() {
    const endY = this.color === EChessColors.WHITE ? 0 : 7;
    return this.cell!.y === endY;
  }

  moveFigure(target: Cell): void {
    super.moveFigure(target);
  }

  get isFirstStep() {
    const startPoint = this.color === EChessColors.WHITE ? 6 : 1;
    return this.cell?.y === startPoint;
  }
}
