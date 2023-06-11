/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IScore, IScoreSliceState } from '../types';

export const initialState: IScoreSliceState = {
  scores: [],
  withLevels: false,
  isLoading: true
};

export const scoreSlice = createSlice({
  name: 'scoreSlice',
  initialState,
  reducers: {
    setScores(state, action: PayloadAction<IScore[]>) {
      state.scores = [...action.payload];
    },
    setWithLevels(state, action: PayloadAction<boolean>) {
      state.withLevels = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  }
});

export const scoreReducer = scoreSlice.reducer;
