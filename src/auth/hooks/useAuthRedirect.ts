import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ERoutes } from '../../router/constants';
import { IUser } from '../types';

export const useAuthRedirect = (user: IUser | null, error: string) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user) {
      const pageFromParams = searchParams.get('page');
      const pageToRedirect = pageFromParams ? `/${pageFromParams}` : ERoutes.MAIN;
      navigate(pageToRedirect);
    }
  }, [navigate, searchParams, user]);

  useEffect(() => {
    if (error) {
      toast.error(t(error) as string);
    }
  }, [error, t]);
};
