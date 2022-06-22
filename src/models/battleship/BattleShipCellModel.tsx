import { BattleshipBoardModel } from "./BattleShipBoardModel";
import { BattleShipElemModel } from "./BattleShipElemModel";

export class BattleshipCellModel {
    x:number;
    y: number;
    board: BattleshipBoardModel;
    elem: BattleShipElemModel | null = null;
    isAttacked: boolean = false;
    id: number
    isAddAvailable:boolean = false
    constructor(y: number, x: number, board:BattleshipBoardModel, isAttacked=false ) {
        this.y = y;
        this.x = x;
        this.board = board;
        this.id = Math.random()
        this.isAttacked = isAttacked
    }

    get isEmpty() {
        return !this.elem
    }

    setIsAttacked() {
        this.isAttacked = true
        if (this.elem?.isDestroyed) {
            const cells = this.board.cells
            let tempCells:BattleshipCellModel[]  = []
            this.elem.cells.forEach(cell => {
                const y = cell.y
                const x = cell.x
                if(cells[y+1]) {
                    tempCells.push(cells[y+1][x], cells[y+1][x+1], cells[y+1][x-1])
                }
                if(cells[y-1]) {
                    tempCells.push(cells[y-1][x], cells[y-1][x+1], cells[y-1][x-1])
                }
                tempCells.push(cells[y][x-1], cells[y][x+1])
            })
            tempCells = tempCells.filter(cell => !!cell && !cell.elem)
            tempCells.forEach(cell => cell.isAttacked = true)
        }
    }
}