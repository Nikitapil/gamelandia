import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { battleshipActions } from '../store/battleship.slice';

export const useBattleshipActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    const actions = {
      ...battleshipActions
    };
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);
};
