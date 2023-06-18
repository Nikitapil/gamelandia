import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/useAppSelector';
import { authSelector } from '../../store/selectors';
import styles from '../assets/styles/profile.module.scss';
import { ProfileNavigation } from '../components/ProfileNavigation';

export const ProfileLayout = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector(authSelector);

  return (
    <div className={`container ${styles.profile}`}>
      <h1 className="page-title">{t('profile')}</h1>
      <ProfileNavigation />
      <div className="w-100">
        <Outlet context={user} />
      </div>
    </div>
  );
};
