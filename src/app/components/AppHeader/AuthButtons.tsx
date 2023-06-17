import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IUser } from '../../../auth/types';
import { HorizotalLoader } from '../../../components/UI/Loaders/HorizotalLoader';
import styles from './header.module.scss';
import { ERoutes } from '../../../router/constants';
import { AppButton } from '../../../components/UI/AppButton/AppButton';

interface IAuthButtonsProps {
  isAuthLoading: boolean;
  user: IUser | null;
  onSignOut: () => void;
}

export const AuthButtons = ({ isAuthLoading, user, onSignOut }: IAuthButtonsProps) => {
  const { t } = useTranslation();

  if (isAuthLoading) {
    return (
      <li>
        <HorizotalLoader />
      </li>
    );
  }

  if (!user) {
    return (
      <>
        <li>
          <Link
            className={styles['nav-bar__link']}
            to={`${ERoutes.LOGIN}`}
          >
            {t('sign_in')}
          </Link>
        </li>
        <li>
          <Link
            className={styles['nav-bar__link']}
            to={`${ERoutes.REGISTRATION}`}
          >
            {t('sign_up')}
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link
          className={styles['nav-bar__link']}
          to={`${ERoutes.PROFILE}`}
        >
          {user.username}
        </Link>
      </li>
      <li>
        <AppButton
          color="danger"
          customClass={styles['logout-btn']}
          onClick={onSignOut}
          type="button"
        >
          {t('logout')}
        </AppButton>
      </li>
    </>
  );
};
