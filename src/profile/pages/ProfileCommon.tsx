import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/useAppSelector';
import { authSelector } from '../../store/selectors';
import { RoundLoader } from '../../components/UI/Loaders/RoundLoader';
import { ERoutes } from '../../router/constants';
import styles from '../assets/styles/profile.module.scss';

export const ProfileCommon = () => {
  const { t } = useTranslation();
  const { user, isAuthLoading } = useAppSelector(authSelector);

  if (isAuthLoading) {
    return (
      <div className="container">
        <RoundLoader />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ERoutes.MAIN} />;
  }

  return (
    <div className={`container ${styles.profile}`}>
      <h1 className="page-title">{t('profile')}</h1>
      {/* TODO add profile navigation */}
      <div className="w-100">
        <Outlet context={user} />
      </div>
    </div>
  );
};
