import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure } from "./figure";
import blackLogo from "../../../assets/checkmates/black-bishop.png";
import whiteLogo from "../../../assets/checkmates/white-bishop.png";
import { FigureNames } from "../../../constants/chess";
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
