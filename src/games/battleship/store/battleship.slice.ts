/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBattleShipSliceState } from '../helpers/types';
import { BattleShipElemModel } from '../models/BattleShipElemModel';
import { BattleshipBoardModel } from '../models/BattleShipBoardModel';

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
    setFreeShips(state, action: PayloadAction<BattleShipElemModel[]>) {
      state.freeShips = [...action.payload];
    },
    setBoard(state, action: PayloadAction<BattleshipBoardModel | null>) {
      let board = null;
      if (action.payload) {
        board = action.payload.copyBoard();
      }
      state.board = board;
    },
    setEnemyBoard(state, action: PayloadAction<BattleshipBoardModel | null>) {
      let board = null;
      if (action.payload) {
        board = action.payload.copyBoard();
      }
      state.enemyBoard = board;
    },
    setCurrentFreeShip(state, action: PayloadAction<BattleShipElemModel | null>) {
      state.currentFreeShip = action.payload;
    }
  }
});

export const { reducer: battleshipReducer, actions: battleshipActions } = battleshipSlice;
