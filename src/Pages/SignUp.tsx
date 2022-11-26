import React, { FC, useState } from 'react';
import { Auth } from 'firebase/auth';
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile
} from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { AuthForm } from '../components/Auth/AuthForm';
import authStyles from '../styles/auth.module.scss';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { breadcrumbs } from '../constants/breadcrumbs';
import { useTitle } from '../hooks/useTitle';
import { useAuthRedirect } from '../hooks/useAuthRedirect';

interface SignUpProps {
  auth: Auth;
}

export const SignUp: FC<SignUpProps> = ({ auth }) => {
  const { t } = useTranslation();
  useTitle(t('sign_up'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.registration]);
  const [createUserWithEmailAndPassword, , , error] =
    useCreateUserWithEmailAndPassword(auth);
  useAuthRedirect(auth, error);
  const [updateProfile] = useUpdateProfile(auth);
  const [displayName, setDisplayName] = useState({ displayName: '' });

  const submit = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(email, password);
    if (!error && displayName) {
      await updateProfile(displayName);
    }
  };

  return (
    <div className={authStyles['auth-container']} data-testid="signup-page">
      <AuthForm
        formTitle={t('sign_up')}
        submit={submit}
        isSignUp
        setDisplayName={setDisplayName}
      />
    </div>
  );
};
