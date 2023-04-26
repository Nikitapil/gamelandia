import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthForm } from '../components/Auth/AuthForm';
import authStyles from '../styles/auth.module.scss';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { breadcrumbs } from '../constants/breadcrumbs';
import { useTitle } from '../hooks/useTitle';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import { ERoutes } from '../constants/routes';
import { useAppSelector } from '../hooks/store/useAppSelector';
import { authSelector } from '../store/selectors';
import { useAuthActions } from '../auth/hooks/useAuthActions';

export const SignUp = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  useTitle(t('sign_up'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.registration]);
  const { user, authError } = useAppSelector(authSelector);
  const { signup } = useAuthActions();
  useAuthRedirect(user, authError);

  const submit = async (email: string, password: string, username: string) => {
    await signup({ email, password, username });
  };

  const loginLink = useMemo(() => {
    if (searchParams.get('page')) {
      return `${ERoutes.LOGIN}?page=${searchParams.get('page')}`;
    }
    return `${ERoutes.LOGIN}`;
  }, [searchParams]);

  return (
    <div className={authStyles['auth-container']} data-testid="signup-page">
      <AuthForm formTitle={t('sign_up')} submit={submit} isSignUp />
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
