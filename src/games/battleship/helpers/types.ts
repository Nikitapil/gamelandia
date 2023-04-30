import { BattleShipElemModel } from '../models/BattleShipElemModel';
import { BattleshipBoardModel } from '../models/BattleShipBoardModel';
import { EBattleShipElemDirection } from './constants';

export interface IBattleShipSliceState {
  freeShips: BattleShipElemModel[];
  board: BattleshipBoardModel | null;
  enemyBoard: BattleshipBoardModel | null;
  currentFreeShip: BattleShipElemModel | null;
}

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
