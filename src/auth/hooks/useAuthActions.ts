import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { logout, refresh, signin, signup } from '../store/auth-actions';

export const useAuthActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    const actions = {
      signup,
      signin,
      refresh,
      logout
    };
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);
};
