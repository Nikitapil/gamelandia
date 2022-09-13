import { EBattleShipElemDirection } from '../../constants/battleship';
import { BattleshipCellModel } from './BattleShipCellModel';

export class BattleShipElemModel {
  size: number;

  cells: BattleshipCellModel[] = [];

  id: number;

  direction: EBattleShipElemDirection = EBattleShipElemDirection.HORIZONTAL;

  constructor(size: number, direction = EBattleShipElemDirection.HORIZONTAL) {
    this.size = size;
    this.id = Math.random();
    this.direction = direction;
  }

  changeDirection() {
    this.direction =
      this.direction === EBattleShipElemDirection.HORIZONTAL
        ? EBattleShipElemDirection.VERTICAL
        : EBattleShipElemDirection.HORIZONTAL;
  }

  get isDestroyed() {
    return this.cells.every((cell) => cell.isAttacked);
  }
}
