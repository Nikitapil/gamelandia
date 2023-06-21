/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthSliceState, IUser } from '../types';
import { ERestorePasswordSteps } from '../constants';

const initialState: IAuthSliceState = {
  user: null,
  isAuthLoading: true,
  authError: '',
  isRestorePasswordLoading: false,
  restorePasswordStep: ERestorePasswordSteps.GET_EMAIL
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
    },
    setIsRestorePasswordLoading(state, action: PayloadAction<boolean>) {
      state.isRestorePasswordLoading = action.payload;
    },
    setRestorePasswordStep(state, action: PayloadAction<ERestorePasswordSteps>) {
      state.restorePasswordStep = action.payload;
    }
  }
});

export const authReducer = authSlice.reducer;
