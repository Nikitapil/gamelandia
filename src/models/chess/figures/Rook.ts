import { FigureNames } from "../../../constants/chess";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure } from "./figure";
import blackLogo from "../../../assets/checkmates/black-rook.png";
import whiteLogo from "../../../assets/checkmates/white-rook.png";

export class Rook extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.ROOK;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (
      this.cell.isEmptyHorizontal(target) ||
      this.cell.isEmptyVertical(target)
    ) {
      return true;
    }
    return false;
  }
}
