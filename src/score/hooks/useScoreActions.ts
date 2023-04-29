import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { createScore, getScore } from '../store/score-actions';

export const useScoreActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    const actions = {
      createScore,
      getScore
    };
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);
};
