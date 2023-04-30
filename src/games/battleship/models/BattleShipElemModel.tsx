import { v4 as uuidv4 } from 'uuid';
import { EBattleShipElemDirection } from '../helpers/constants';
import { BattleshipCellModel } from './BattleShipCellModel';

export class BattleShipElemModel {
  size: number;

  cells: BattleshipCellModel[] = [];

  id: number;

  direction: EBattleShipElemDirection = EBattleShipElemDirection.HORIZONTAL;

  constructor(size: number, direction = EBattleShipElemDirection.HORIZONTAL) {
    this.size = size;
    this.id = uuidv4();
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
