import { ETicTacIcons } from "../../constants/tictactoe";
import { TicBoard } from "./TicBoard";

export class TicCell {
    icon: ETicTacIcons | null = null
    board: TicBoard
    x: number
    y: number
    id: number
    constructor(board:TicBoard, x:number, y: number ) {
        this.board = board
        this.x = x
        this.y = y
        this.id = Math.random()
    }

    click() {
        this.icon = this.board.currentPlayer
        this.board = this.board.updateBoard()
        return this.board
    }
}