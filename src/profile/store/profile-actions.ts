import { toast } from 'react-toastify';
import { IEditUserRequest } from '../types';
import { AppDispatch } from '../../store';
import { authSlice } from '../../auth/store/auth.slice';
import { ProfileService } from '../ProfileService';

export const editUser = (editUserRequest: IEditUserRequest) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setIsAuthLoading(true));
      const { data } = await ProfileService.editUser(editUserRequest);
      dispatch(authSlice.actions.setUser(data));
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error while editing user');
    } finally {
      dispatch(authSlice.actions.setIsAuthLoading(false));
    }
  };
};
