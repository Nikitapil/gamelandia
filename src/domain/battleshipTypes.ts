import { BattleshipBoardModel } from './../models/battleship/BattleShipBoardModel';
import { BattleShipElemModel } from './../models/battleship/BattleShipElemModel';

export enum BattleShipActionsTypes {
    SET_FREE_SHIPS = 'SET_FREE_SHIPS',
    SET_BOARD = 'SET_BATTLE_SHIP_BOARD',
    SET_CURRENT_FREE_SHIP = 'SET_CURRENT_FREE_SHIP'
}

export interface IBattleShipState {
    freeShips: BattleShipElemModel[],
    board: BattleshipBoardModel | null,
    currentFreeShip: BattleShipElemModel | null
}

interface ISetFreeShipsState {
    type: BattleShipActionsTypes.SET_FREE_SHIPS,
    payload:  BattleShipElemModel[]
}

interface ISetBattleShipBoard {
    type: BattleShipActionsTypes.SET_BOARD,
    payload: BattleshipBoardModel
}

interface ISetCurrentFreeShip {
    type: BattleShipActionsTypes.SET_CURRENT_FREE_SHIP,
    payload: BattleShipElemModel | null
}

export type BattleShipActions = ISetFreeShipsState | ISetBattleShipBoard | ISetCurrentFreeShip