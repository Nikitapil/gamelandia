/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppInitialState, IBreabcrumb } from '../types';
import { breadcrumbs } from '../../constants/breadcrumbs';

const initialState: IAppInitialState = {
  breadcrumbs: [breadcrumbs.main]
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setBreadcrumbs(state, action: PayloadAction<IBreabcrumb[]>) {
      state.breadcrumbs = action.payload;
    }
  }
});

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;
