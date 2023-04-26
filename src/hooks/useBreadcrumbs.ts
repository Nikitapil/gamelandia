import { useEffect } from 'react';
import { IBreabcrumb } from '../store/app/types';
import { useAppActions } from './store/useAppActions';

export const useBreadcrumbs = (breadcrumbsArray: IBreabcrumb[]) => {
  const { setBreadcrumbs } = useAppActions();
  useEffect(() => {
    setBreadcrumbs(breadcrumbsArray);
  }, [breadcrumbsArray, setBreadcrumbs]);
};
