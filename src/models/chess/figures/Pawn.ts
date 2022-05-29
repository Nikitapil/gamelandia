import { FigureNames } from '../../../constants/chess';
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure } from './figure';
import blackLogo from '../../../assets/checkmates/black-pawn.png'
import whiteLogo from '../../../assets/checkmates/white-pawn.png'


export class Pawn extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.PAWN
    }

    isFirstStep:boolean = true

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false
        }
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        const firestStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2
        if ((target.y === this.cell.y + direction || this.isFirstStep && (target.y === this.cell.y + firestStepDirection))
        && target.x === this.cell.x && this.cell.board.getCell(target.x, target.y).isEmpty() && this.cell.isEmptyVertical(target)
        ) {
            return true
        }
        if ((target.y === this.cell.y + direction) && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) && this.cell.isEnemy(target)) {
                return true
            }
        
        return false
    }

    moveFigure(target: Cell): void {
        super.moveFigure(target)
        this.isFirstStep = false
    }
}