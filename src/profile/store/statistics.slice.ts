import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGameStatistics, IStatisticsState } from '../types';

const initialState: IStatisticsState = {
  gameStatistics: [],
  isLoading: false
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setGameStatistics: (state, action: PayloadAction<IGameStatistics[]>) => {
      state.gameStatistics = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const statisticsReducer = statisticsSlice.reducer;
