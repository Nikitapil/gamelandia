import { BattleShipElemModel } from './models/BattleShipElemModel';
import { BattleshipBoardModel } from './models/BattleShipBoardModel';

export interface IBattleShipSliceState {
  freeShips: BattleShipElemModel[];
  board: BattleshipBoardModel | null;
  enemyBoard: BattleshipBoardModel | null;
  currentFreeShip: BattleShipElemModel | null;
}
