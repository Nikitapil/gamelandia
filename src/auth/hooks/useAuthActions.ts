import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import {
  getRestorePasswordKey,
  logout,
  refresh,
  restorePassword,
  signin,
  signup
} from '../store/auth-actions';

export const useAuthActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    const actions = {
      signup,
      signin,
      refresh,
      logout,
      getRestorePasswordKey,
      restorePassword
    };
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);
};
