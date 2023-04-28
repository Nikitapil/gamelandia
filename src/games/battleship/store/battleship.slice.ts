/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IBattleShipSliceState } from '../types';
import { TReduxAction } from '../../../store/store-types';
import { BattleShipElemModel } from '../../../models/battleship/BattleShipElemModel';
import { BattleshipBoardModel } from '../../../models/battleship/BattleShipBoardModel';

const initialState: IBattleShipSliceState = {
  freeShips: [],
  board: null,
  enemyBoard: null,
  currentFreeShip: null
};

export const battleshipSlice = createSlice({
  name: 'battleshipSlice',
  initialState,
  reducers: {
    setFreeShips(state, action: TReduxAction<BattleShipElemModel[]>) {
      state.freeShips = [...action.payload];
    },
    setBoard(state, action: TReduxAction<BattleshipBoardModel | null>) {
      let board = null;
      if (action.payload) {
        board = action.payload.copyBoard();
      }
      state.board = board;
    },
    setEnemyBoard(state, action: TReduxAction<BattleshipBoardModel | null>) {
      let board = null;
      if (action.payload) {
        board = action.payload.copyBoard();
      }
      state.enemyBoard = board;
    },
    setCurrentFreeShip(
      state,
      action: TReduxAction<BattleShipElemModel | null>
    ) {
      state.currentFreeShip = action.payload;
    }
  }
});

export const { reducer: battleshipReducer, actions: battleshipActions } =
  battleshipSlice;
