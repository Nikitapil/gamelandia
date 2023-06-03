import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { getWinners, updateWinCount } from '../store/wins-actions';

export const useWinnersActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    const actions = {
      updateWinCount,
      getWinners
    };
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);
};
