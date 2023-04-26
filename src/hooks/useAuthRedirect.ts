import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ERoutes } from '../constants/routes';
import { IUser } from '../auth/types';

export const useAuthRedirect = (user: IUser | null, error: string) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (user) {
      if (searchParams.get('page')) {
        navigate(`/${searchParams.get('page')}`);
        return;
      }
      navigate(ERoutes.MAIN);
    }
  }, [navigate, searchParams, user]);

  useEffect(() => {
    if (error) {
      toast.error(t(error) as string);
    }
  }, [error, t]);
};
