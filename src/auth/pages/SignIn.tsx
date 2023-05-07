import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthForm } from '../components/AuthForm/AuthForm';
import styles from '../assets/styles/auth.module.scss';
import { useBreadcrumbs } from '../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../constants/breadcrumbs';
import { useTitle } from '../../hooks/useTitle';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import { ERoutes } from '../../constants/routes';
import { useAppSelector } from '../../hooks/useAppSelector';
import { authSelector } from '../../store/selectors';
import { useAuthActions } from '../hooks/useAuthActions';
import { ISignUpAuthRequest } from '../types';
import { useAuthLink } from '../hooks/useAuthLink';

export const SignIn = () => {
  const { t } = useTranslation();
  useTitle(t('sign_in'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.login]);

  const { user, authError, isAuthLoading } = useAppSelector(authSelector);
  const { signin } = useAuthActions();
  const registeredLink = useAuthLink(ERoutes.REGISTRATION);
  useAuthRedirect(user, authError);

  const submit = async ({ email, password }: ISignUpAuthRequest) => {
    await signin({ email, password });
  };

  return (
    <div className={styles['auth-container']}>
      <AuthForm
        formTitle={t('title_sign_in')}
        isLoading={isAuthLoading}
        submit={submit}
      />
      <Link
        className={styles['auth-link']}
        to={registeredLink}
        data-testid="signup-link"
      >
        {t('form_not_registered')}
      </Link>
    </div>
  );
};
