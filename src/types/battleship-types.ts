import { EBattleShipElemDirection } from '../constants/battleship';

export interface IFireBaseCells {
  x: number;
  y: number;
  isAttacked: boolean;
}

export interface IFirebaseShip {
  size: number;
  cells: IFireBaseCells[];
  direction: EBattleShipElemDirection;
}
