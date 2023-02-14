import React, { FC, useMemo } from 'react';
import { Auth } from 'firebase/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthForm } from '../components/Auth/AuthForm';
import authStyles from '../styles/auth.module.scss';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { breadcrumbs } from '../constants/breadcrumbs';
import { useTitle } from '../hooks/useTitle';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import { ERoutes } from '../constants/routes';

interface SignInProps {
  auth: Auth;
}

export const SignIn: FC<SignInProps> = ({ auth }) => {
  const { t } = useTranslation();
  useTitle(t('sign_in'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.login]);
  const [signInWithEmailAndPassword, , , error] =
    useSignInWithEmailAndPassword(auth);
  useAuthRedirect(auth, error);
  const [searchParams] = useSearchParams();

  const submit = async (email: string, password: string) => {
    await signInWithEmailAndPassword(email, password);
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
