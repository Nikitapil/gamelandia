import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../hooks/useAppSelector';
import { authSelector } from '../store/selectors';
import { RoundLoader } from './UI/Loaders/RoundLoader';
import { ERoutes } from '../router/constants';

interface IProtectedRouteWithAuth {
  children: JSX.Element;
}

export const ProtectedRouteWithAuth = ({ children }: IProtectedRouteWithAuth) => {
  const { t } = useTranslation();
  const { user, isAuthLoading } = useAppSelector(authSelector);
  const route = useLocation();

  if (isAuthLoading) {
    return (
      <div className="container">
        <RoundLoader />
      </div>
    );
  }

  if (!user) {
    if (!toast.isActive('need_login_first')) {
      toast.info(t('need_login_first') as string, {
        toastId: 'need_login_first'
      });
    }
    return <Navigate to={`${ERoutes.LOGIN}/?page=${route.pathname}`} />;
  }

  return children;
};
