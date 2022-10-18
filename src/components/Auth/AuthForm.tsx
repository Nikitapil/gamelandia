import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import authStyles from '../../styles/auth.module.scss';
import { AppInput } from '../UI/AppInput';
import { AppButton } from '../UI/AppButton';

interface AuthFormProps {
  formTitle: string;
  submit: (email: string, password: string) => void;
  isSignUp?: boolean;
  setDisplayName?: (params: { displayName: string }) => void;
}

export const AuthForm: FC<AuthFormProps> = ({
  formTitle,
  submit,
  isSignUp = false,
  setDisplayName
}) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [userName, setUserName] = useState('');

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { t } = useTranslation();

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setDisplayName) {
      setUserName(e.target.value);
    }
  };

  useEffect(() => {
    if (setDisplayName) {
      setDisplayName({ displayName: userName });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(formData.email, formData.password);
  };

  return (
    <form className={authStyles['auth-form']} onSubmit={onSubmit}>
      <h2 className={authStyles['auth-form__title']}>{formTitle}</h2>
      <AppInput
        type="email"
        name="email"
        value={formData.email}
        onChange={onInput}
        testId="email-input"
        label={t('your_email')}
      />
      <AppInput
        type="password"
        name="password"
        value={formData.password}
        onChange={onInput}
        label={t('your_password')}
      />
      {isSignUp && (
        <AppInput
          type="text"
          data-testid="display-name"
          name="displayName"
          testId="display-name"
          value={userName}
          onChange={onChangeUserName}
          label={t('your_name')}
          required
        />
      )}
      <AppButton fullWidth type="submit" testId="submit">
        {formTitle}
      </AppButton>
    </form>
  );
};
