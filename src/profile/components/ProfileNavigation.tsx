import React from 'react';
import { useTranslation } from 'react-i18next';
import { ERoutes } from '../../router/constants';
import styles from '../assets/styles/profile.module.scss';
import { AppNavLink } from '../../components/UI/AppNavLink/AppNavLink';

export const ProfileNavigation = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.navigation}>
      <AppNavLink
        to={ERoutes.PROFILE}
        text={t('profile')}
        classNames={[styles.navigation__link]}
        activeClassNames={[styles.navigation__link, styles.active]}
      />
      <AppNavLink
        to={ERoutes.PROFILE_STATISTICS}
        text={t('statistics')}
        classNames={[styles.navigation__link]}
        activeClassNames={[styles.navigation__link, styles.active]}
      />
    </div>
  );
};
