import { EBattleShipElemDirection } from "../../constants/battleship";
import { BattleshipCellModel } from "./BattleShipCellModel";

export class BattleShipElemModel {
    size: number;
    cells: BattleshipCellModel[] = []
    id: number;
    direction: EBattleShipElemDirection = EBattleShipElemDirection.HORIZONTAL
    constructor(size: number) {
        this.size = size
        this.id = Math.random()
    }

    changeDirection() {        
        this.direction = this.direction === EBattleShipElemDirection.HORIZONTAL ? EBattleShipElemDirection.VERTICAL : EBattleShipElemDirection.HORIZONTAL
    }
}