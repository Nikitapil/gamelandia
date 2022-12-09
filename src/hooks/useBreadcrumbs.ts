import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IBreabcrumb } from '../types/app-types';
import { setBreadCrumbs } from '../redux/appStore/app-actions';

export const useBreadcrumbs = (breadcrubsArray: IBreabcrumb[]) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBreadCrumbs(breadcrubsArray));
  }, []);
};
