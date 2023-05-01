import { useEffect } from 'react';
import { IBreabcrumb } from '../types';
import { useAppActions } from './useAppActions';

export const useBreadcrumbs = (breadcrumbsArray: IBreabcrumb[]) => {
  const { setBreadcrumbs } = useAppActions();
  useEffect(() => {
    setBreadcrumbs(breadcrumbsArray);
  }, [breadcrumbsArray, setBreadcrumbs]);
};
