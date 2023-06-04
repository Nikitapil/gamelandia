import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ERoutes } from '../../constants/routes';

export const useAuthLink = (pathname: ERoutes.REGISTRATION | ERoutes.LOGIN) => {
  const [searchParams] = useSearchParams();
  return useMemo(() => {
    return {
      pathname,
      search: searchParams.toString()
    };
  }, [pathname, searchParams]);
};
