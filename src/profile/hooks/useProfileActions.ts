import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { deleteProfile, editUser, getGameStatistics } from '../store/profile-actions';

export const useProfileActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    const actions = { editUser, getGameStatistics, deleteProfile };

    return bindActionCreators(actions, dispatch);
  }, [dispatch]);
};
