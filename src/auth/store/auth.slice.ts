/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthSliceState, IUser } from '../types';

const initialState: IAuthSliceState = {
  user: null,
  isAuthLoading: true,
  authError: ''
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
    setIsAuthLoading(state, action: PayloadAction<boolean>) {
      state.isAuthLoading = action.payload;
    },
    setAuthError(state, action: PayloadAction<string>) {
      state.authError = action.payload;
    }
  }
});

export const authReducer = authSlice.reducer;
