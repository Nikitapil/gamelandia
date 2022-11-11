import { BattleshipBoardModel } from '../../models/battleship/BattleShipBoardModel';
import { BattleShipActionsTypes } from '../../types/battleshipTypes';
import { BattleShipElemModel } from '../../models/battleship/BattleShipElemModel';

export const setFreeShips = (payload: BattleShipElemModel[]) => {
  return {
    type: BattleShipActionsTypes.SET_FREE_SHIPS,
    payload
  };
};

export const setBattleShipBoard = (payload: BattleshipBoardModel | null) => {
  return {
    type: BattleShipActionsTypes.SET_BOARD,
    payload
  };
};

export const setCurrentFreeShip = (payload: BattleShipElemModel | null) => {
  return {
    type: BattleShipActionsTypes.SET_CURRENT_FREE_SHIP,
    payload
  };
};

export const setBattleShipEnemyBoard = (
  payload: BattleshipBoardModel | null
) => {
  return {
    type: BattleShipActionsTypes.SET_ENEMY_BOARD,
    payload
  };
};
