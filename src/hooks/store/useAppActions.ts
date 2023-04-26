import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { appActions } from '../../store/app/app.slice';

export const useAppActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    const actions = {
      ...appActions
    };
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);
};
