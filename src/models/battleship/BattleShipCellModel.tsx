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
    constructor(y: number, x: number, board:BattleshipBoardModel ) {
        this.y = y;
        this.x = x;
        this.board = board;
        this.id = Math.random()
    }

    get isEmpty() {
        return !this.elem
    }

}