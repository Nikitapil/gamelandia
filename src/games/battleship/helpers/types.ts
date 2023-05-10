import { BattleShipElemModel } from '../models/BattleShipElemModel';
import { BattleshipBoardModel } from '../models/BattleShipBoardModel';
import { EBattleShipElemDirection } from './constants';
import { BattleshipCellModel } from '../models/BattleShipCellModel';

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

export type TBattleshipPlayer = {
  uid: number;
  name: string;
  cells: IFireBaseCells[];
  isReady?: boolean;
  ships?: IFirebaseShip[];
};

export type TBattleshipRoomData = {
  id: string;
  isAvailable: boolean;
  name: string;
  player1: TBattleshipPlayer | null;
  player2: TBattleshipPlayer | null;
  currentPlayer?: TPlayerKey;
  winner?: string;
};

export type TPlayerKey = 'player1' | 'player2' | '';

export type TAttackCellParams = {
  roomData: TBattleshipRoomData;
  playerToAttack: TPlayerKey;
  playerToAttackCells: BattleshipCellModel[][];
  playerToAttackShips: BattleShipElemModel[];
  isWinner: boolean;
  isSuccessfullAtack: boolean;
};

export type TSetIsReadyParams = {
  roomData: TBattleshipRoomData;
  myPlayer: TPlayerKey;
  myCells: BattleshipCellModel[][];
  myShips: BattleShipElemModel[];
};
