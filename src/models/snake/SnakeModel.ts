import { ESnakeDirections } from './../../constants/snake';
import { SnakeBoardModel } from './SnakeBoardModel';
import { SnakeCellModel } from './SnakeCellModel';
import { SnakeElemModel } from "./SnakeElemModel";

export class SnakeModel {
    elems: SnakeElemModel[] = []
    direction: ESnakeDirections = ESnakeDirections.RIGHT
    board: SnakeBoardModel

    constructor(board: SnakeBoardModel) {
        this.board = board
    }
    
    addFirstElem(cell:SnakeCellModel) {
        this.elems.push(new SnakeElemModel(cell, this))
    } 

    

    getNextCell() {
        const currentCellX = this.elems[0].cell?.x
        const currentCellY = this.elems[0].cell?.y
        if (this.direction === ESnakeDirections.RIGHT) {
            return this.board.cells[currentCellY!][currentCellX! + 1] || this.board.cells[currentCellY!][0]
        }
        if (this.direction === ESnakeDirections.LEFT) {
            return this.board.cells[currentCellY!][currentCellX! - 1] || this.board.cells[currentCellY!][19]
        }
        if (this.direction === ESnakeDirections.BOTTOM) {
            return this.board.cells[currentCellY!+1] ? this.board.cells[currentCellY!+1][currentCellX!] : this.board.cells[0][currentCellX!]
        }
        if (this.direction === ESnakeDirections.TOP) {
            return this.board.cells[currentCellY!-1] ? this.board.cells[currentCellY!-1][currentCellX!] : this.board.cells[19][currentCellX!]
        }
    }

    move() {
        const nextCell = this.getNextCell()
        if (nextCell?.elem) {
            this.board.endGame()
            return
        }
        this.elems[this.elems.length -1].cell!.elem = null
        if (!nextCell?.food) {
            this.elems.pop()
        }
        this.elems.unshift(new SnakeElemModel(nextCell!, this))
        if(nextCell?.food) {
            this.board.score++
            nextCell.food = false
            this.board.addFood()
        }
    }

    changeDirection(direction: ESnakeDirections) {
        this.direction = direction
    }
}