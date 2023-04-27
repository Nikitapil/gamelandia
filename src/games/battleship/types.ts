import { BattleShipElemModel } from '../../models/battleship/BattleShipElemModel';
import { BattleshipBoardModel } from '../../models/battleship/BattleShipBoardModel';

export interface IBattleShipSliceState {
  freeShips: BattleShipElemModel[];
  board: BattleshipBoardModel | null;
  enemyBoard: BattleshipBoardModel | null;
  currentFreeShip: BattleShipElemModel | null;
}
