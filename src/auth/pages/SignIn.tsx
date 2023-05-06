import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthForm } from '../components/AuthForm/AuthForm';
import authStyles from '../../styles/auth.module.scss';
import { useBreadcrumbs } from '../../app/hooks/useBreadcrumbs';
import { breadcrumbs } from '../../constants/breadcrumbs';
import { useTitle } from '../../hooks/useTitle';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import { ERoutes } from '../../constants/routes';
import { useAppSelector } from '../../hooks/useAppSelector';
import { authSelector } from '../../store/selectors';
import { useAuthActions } from '../hooks/useAuthActions';
import { ISignUpAuthRequest } from '../types';

export const SignIn = () => {
  const { t } = useTranslation();
  useTitle(t('sign_in'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.login]);
  const { user, authError } = useAppSelector(authSelector);
  const { signin } = useAuthActions();
  useAuthRedirect(user, authError);
  const [searchParams] = useSearchParams();

  const submit = async ({ email, password }: ISignUpAuthRequest) => {
    await signin({ email, password });
  };

  const registeredLink = useMemo(() => {
    if (searchParams.get('page')) {
      return `${ERoutes.REGISTRATION}?page=${searchParams.get('page')}`;
    }
    return `${ERoutes.REGISTRATION}`;
  }, [searchParams]);

  return (
    <div className={authStyles['auth-container']}>
      <AuthForm formTitle={t('title_sign_in')} submit={submit} />
      <Link
        className={authStyles['auth-link']}
        to={registeredLink}
        data-testid="signup-link"
      >
        {t('form_not_registered')}
      </Link>
    </div>
  );
};
