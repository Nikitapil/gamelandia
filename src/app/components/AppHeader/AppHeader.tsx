import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './header.module.scss';
import { ERoutes } from '../../../constants/routes';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { authSelector } from '../../../store/selectors';
import { useAuthActions } from '../../../auth/hooks/useAuthActions';
import { AuthButtons } from './AuthButtons';

export const AppHeader = () => {
  const { user, isAuthLoading } = useAppSelector(authSelector);
  const { logout } = useAuthActions();
  const { t } = useTranslation();

  const onSignOut = async () => {
    await logout();
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <h1 className={styles.header__title}>GameLandia</h1>
        <nav className={styles['header__nav-bar']}>
          <ul className={styles['nav-bar__links']}>
            <li>
              <Link className={styles['nav-bar__link']} to={`${ERoutes.MAIN}`}>
                {t('main')}
              </Link>
            </li>
            <AuthButtons
              isAuthLoading={isAuthLoading}
              user={user}
              onSignOut={onSignOut}
            />
          </ul>
        </nav>
      </div>
    </header>
  );
};
