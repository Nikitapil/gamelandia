/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWinCount, IWinsSliceInterface } from '../types';

const initialState: IWinsSliceInterface = {
  isWinnersLoading: false,
  winners: []
};

export const winsSlice = createSlice({
  name: 'winsSlice',
  initialState,
  reducers: {
    setWinners(state, action: PayloadAction<IWinCount[]>) {
      state.winners = action.payload;
    },
    setIsWinnersLoading(state, action: PayloadAction<boolean>) {
      state.isWinnersLoading = action.payload;
    }
  }
});

export const winsReducer = winsSlice.reducer;
