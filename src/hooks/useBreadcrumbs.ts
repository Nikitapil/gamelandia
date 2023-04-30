import { useEffect } from 'react';
import { IBreabcrumb } from '../app/types';
import { useAppActions } from '../app/hooks/useAppActions';

export const useBreadcrumbs = (breadcrumbsArray: IBreabcrumb[]) => {
  const { setBreadcrumbs } = useAppActions();
  useEffect(() => {
    setBreadcrumbs(breadcrumbsArray);
  }, [breadcrumbsArray, setBreadcrumbs]);
};
