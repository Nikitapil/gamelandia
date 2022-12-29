import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Auth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { HorizotalLoader } from '../UI/Loaders/HorizotalLoader';
import headerStyles from '../../styles/header.module.scss';
import { AppButton } from '../UI/AppButton';

interface AppHeaderProps {
  auth: Auth;
}

export const AppHeader: FC<AppHeaderProps> = ({ auth }) => {
  const [user, loading] = useAuthState(auth);
  const { t } = useTranslation();

  const onSignOut = async () => {
    await signOut(auth);
  };

  return (
    <header className={headerStyles.header}>
      <div className={`container ${headerStyles.header__container}`}>
        <h1 className={headerStyles.header__title}>GameLandia demo</h1>
        <nav className={headerStyles['header__nav-bar']}>
          <ul className={headerStyles['nav-bar__links']}>
            <li>
              <Link className={headerStyles['nav-bar__link']} to="/">
                {t('main')}
              </Link>
            </li>
            {/* eslint-disable-next-line no-nested-ternary */}
            {loading ? (
              <li>
                <HorizotalLoader />
              </li>
            ) : !user ? (
              <>
                <li>
                  <Link className={headerStyles['nav-bar__link']} to="/login">
                    {t('sign_in')}
                  </Link>
                </li>
                <li>
                  {' '}
                  <Link
                    className={headerStyles['nav-bar__link']}
                    to="/registration"
                  >
                    {t('sign_up')}
                  </Link>
                </li>
              </>
            ) : (
              <li>
                {' '}
                <AppButton
                  color="transparent"
                  customClass={headerStyles['logout-btn']}
                  onClick={onSignOut}
                  type="button"
                >
                  {t('logout')}
                </AppButton>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
