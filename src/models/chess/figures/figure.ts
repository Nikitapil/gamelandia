import { Colors } from './../Colors';
import logo from '../../../assets/checkmates/black-king.png'
import { FigureNames } from '../../../constants/chess';
import { Cell } from '../Cell';



export class Figure {
    color: Colors;
    logo: typeof logo | null
    cell:Cell;
    name: FigureNames;
    id: number;

    constructor (color: Colors, cell:Cell) {
        this.color = color
        this.cell = cell
        this.cell.figure = this
        this.logo = null
        this.name = FigureNames.FIGURE
        this.id = Math.random()
    }

    canMove(target: Cell): boolean {
        if (target.figure?.color === this.color) {
            return false
        }
        if (this.name === FigureNames.KING && target.figure?.name === FigureNames.KING) {
            return false
        }
        // const copyBoard = this.cell.board.getCopyBoard()
        // copyBoard.getCell(this.cell.x, this.cell.y).figure = null
        return true
    }
    moveFigure(target: Cell) {}

    // isUnderAttack() {
    //     for (let i = 0; i< this.cell.board.cells.length; i++) {
    //         const row = this.cell.board.cells[i]
            
    //         for (let j = 0; j < row.length; j++) {
    //             const cell = row[j]                                
    //             if (cell.figure?.canMove(this.cell)) {
    //                 console.log('true');
                    
    //                 return true
    //             }
    //         }
    //     }
    //     console.log('false');
        
    //     return false
    // }
}