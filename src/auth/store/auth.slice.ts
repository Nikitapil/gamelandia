/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IAuthSliceState, IUser } from '../types';
import { TReduxAction } from '../../store/store-types';

const initialState: IAuthSliceState = {
  user: null,
  isAuthLoading: true,
  authError: ''
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser(state, action: TReduxAction<IUser | null>) {
      state.user = action.payload;
    },
    setIsAuthLoading(state, action: TReduxAction<boolean>) {
      state.isAuthLoading = action.payload;
    },
    setAuthError(state, action: TReduxAction<string>) {
      state.authError = action.payload;
    }
  }
});

export const authReducer = authSlice.reducer;
