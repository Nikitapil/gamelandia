import React, { FC, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import authStyles from '../../../styles/auth.module.scss';
import { AppInput } from '../../../components/UI/AppInput';
import { AppButton } from '../../../components/UI/AppButton';
import { TValidationRules } from '../../../utils/validators';
import { useInputTouch } from '../../../hooks/useInputTouch';

interface AuthFormProps {
  formTitle: string;
  submit: (email: string, password: string, username: string) => void;
  isSignUp?: boolean;
  setDisplayName?: (params: { displayName: string }) => void;
}

export const AuthForm: FC<AuthFormProps> = ({
  formTitle,
  submit,
  isSignUp = false
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [passwordType, setPasswordType] = useState<
    'email' | 'password' | 'text'
  >('password');
  const form = useRef<HTMLFormElement | null>(null);
  const { touch } = useInputTouch(form.current);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { t } = useTranslation();

  const onChangePasswordType = () => {
    if (passwordType === 'text') {
      setPasswordType('password');
      return;
    }
    setPasswordType('text');
  };

  const isFormValid = useMemo(() => {
    return !(formErrors.email || formErrors.password || formErrors.username);
  }, [formErrors.email, formErrors.password, formErrors.username]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    touch();
    if (isFormValid) {
      submit(formData.email, formData.password, formData.username);
    }
  };

  const passwordRules = useMemo((): TValidationRules[] => {
    return isSignUp ? ['required', 'password'] : ['required'];
  }, [isSignUp]);

  const onError = (name: string, err: string) => {
    setFormErrors({ ...formErrors, [name]: err });
  };

  return (
    <form className={authStyles['auth-form']} onSubmit={onSubmit} ref={form}>
      <h2 className={authStyles['auth-form__title']}>{formTitle}</h2>
      <AppInput
        type="email"
        name="email"
        value={formData.email}
        onChange={onInput}
        onError={onError}
        testId="email-input"
        label={t('your_email')}
        required
        rules={['required', 'email']}
      />
      <div className={authStyles['auth-form__password']}>
        <AppInput
          type={passwordType}
          name="password"
          className={authStyles['auth-form__password-field']}
          testId="password-input"
          value={formData.password}
          onChange={onInput}
          onError={onError}
          label={t('your_password')}
          required
          rules={passwordRules}
        />
        <button
          type="button"
          title="Show password"
          className={passwordType === 'text' ? authStyles.active : ''}
          onClick={onChangePasswordType}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
      </div>
      {isSignUp && (
        <AppInput
          type="text"
          data-testid="display-name"
          name="username"
          testId="display-name"
          value={formData.username}
          onChange={onInput}
          onError={onError}
          label={t('your_name')}
          required
          rules={['required']}
        />
      )}
      <AppButton
        customClass="mt-m"
        fullWidth
        type="submit"
        testId="submit"
        disabled={!isFormValid}
      >
        {formTitle}
      </AppButton>
    </form>
  );
};
