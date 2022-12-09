import {
  BattleShipActions,
  BattleShipActionsTypes,
  IBattleShipState
} from '../../types/battleship-types';

const initialState: IBattleShipState = {
  freeShips: [],
  board: null,
  enemyBoard: null,
  currentFreeShip: null
};

export const battleshipReducer = (
  state = initialState,
  action: BattleShipActions
): IBattleShipState => {
  switch (action.type) {
    case BattleShipActionsTypes.SET_FREE_SHIPS:
      return { ...state, freeShips: action.payload };
    case BattleShipActionsTypes.SET_BOARD:
      return { ...state, board: action.payload };
    case BattleShipActionsTypes.SET_CURRENT_FREE_SHIP:
      return { ...state, currentFreeShip: action.payload };
    case BattleShipActionsTypes.SET_ENEMY_BOARD:
      return { ...state, enemyBoard: action.payload };
    default:
      return state;
  }
};
