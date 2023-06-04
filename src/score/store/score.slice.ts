/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IScore, IScoreSliceState } from '../types';
import { TReduxAction } from '../../store/store-types';

export const initialState: IScoreSliceState = {
  scores: [],
  withLevels: false,
  isLoading: true
};

export const scoreSlice = createSlice({
  name: 'scoreSlice',
  initialState,
  reducers: {
    setScores(state, action: TReduxAction<IScore[]>) {
      state.scores = [...action.payload];
    },
    setWithLevels(state, action: TReduxAction<boolean>) {
      state.withLevels = action.payload;
    },
    setIsLoading(state, action: TReduxAction<boolean>) {
      state.isLoading = action.payload;
    }
  }
});

export const scoreReducer = scoreSlice.reducer;
