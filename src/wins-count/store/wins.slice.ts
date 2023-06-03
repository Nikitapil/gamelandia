/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IWinCount, IWinsSliceInterface } from '../types';
import { TReduxAction } from '../../store/store-types';

const initialState: IWinsSliceInterface = {
  isWinnersLoading: false,
  winners: []
};

export const winsSlice = createSlice({
  name: 'winsSlice',
  initialState,
  reducers: {
    setWinners(state, action: TReduxAction<IWinCount[]>) {
      state.winners = action.payload;
    },
    setIsWinnersLoading(state, action: TReduxAction<boolean>) {
      state.isWinnersLoading = action.payload;
    }
  }
});

export const winsReducer = winsSlice.reducer;
