import { SnakeBoardModel } from './SnakeBoardModel';
import { SnakeElemModel } from './SnakeElemModel';

export class SnakeCellModel {
    board:SnakeBoardModel | null = null
    id: number
    x: number
    y:number
    elem: SnakeElemModel | null = null
    food = false
    constructor (board:SnakeBoardModel, x:number, y: number) {
        this.board = board
        this.id = Math.random()
        this.x = x
        this.y = y
    }
}