import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm/AuthForm';
import authStyles from '../assets/styles/auth.module.scss';
import { useBreadcrumbs } from '../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../constants/breadcrumbs';
import { useTitle } from '../../hooks/useTitle';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import { ERoutes } from '../../router/constants';
import { useAppSelector } from '../../hooks/useAppSelector';
import { authSelector } from '../../store/selectors';
import { useAuthActions } from '../hooks/useAuthActions';
import { ISignUpAuthRequest } from '../types';
import { useAuthLink } from '../hooks/useAuthLink';

export const SignUp = () => {
  const { t } = useTranslation();
  useTitle(t('sign_up'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.registration]);
  const loginLink = useAuthLink(ERoutes.LOGIN);

  const { user, authError, isAuthLoading } = useAppSelector(authSelector);
  const { signup } = useAuthActions();
  useAuthRedirect(user, authError);

  const submit = async (authData: ISignUpAuthRequest) => {
    await signup(authData);
  };

  return (
    <div
      className={authStyles['auth-container']}
      data-testid="signup-page"
    >
      <AuthForm
        formTitle={t('sign_up')}
        isLoading={isAuthLoading}
        isSignUp
        submit={submit}
      />
      <Link
        className={authStyles['auth-link']}
        to={loginLink}
        data-testid="signup-link"
      >
        {t('already_registered')}
      </Link>
    </div>
  );
};
