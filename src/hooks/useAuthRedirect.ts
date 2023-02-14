import { Auth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setAppNotification } from '../redux/appStore/app-actions';
import { authErrorMessages } from '../constants/app-messages';
import { ERoutes } from '../constants/routes';

export const useAuthRedirect = (auth: Auth, error: any) => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
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
      dispatch(
        setAppNotification({
          timeout: 5000,
          message: t(authErrorMessages[error.code]),
          type: 'error'
        })
      );
    }
  }, [dispatch, error, t]);
};
