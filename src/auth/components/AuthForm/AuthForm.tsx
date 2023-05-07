import { ChangeEvent, FC, FormEvent, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/auth.module.scss';
import { AppInput } from '../../../components/UI/AppInput/AppInput';
import { AppButton } from '../../../components/UI/AppButton';
import { TValidationRules } from '../../../utils/validators';
import { useInputTouch } from '../../../hooks/useInputTouch';
import { ISignUpAuthRequest } from '../../types';
import { AppPasswordInput } from '../../../components/UI/AppInput/AppPasswordInput';

interface AuthFormProps {
  formTitle: string;
  submit: (authData: ISignUpAuthRequest) => void;
  isSignUp?: boolean;
}

export const AuthForm: FC<AuthFormProps> = ({
  formTitle,
  submit,
  isSignUp = false
}) => {
  const { t } = useTranslation();

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

  const form = useRef<HTMLFormElement | null>(null);
  const { touch } = useInputTouch(form.current);

  const isFormValid = useMemo(() => {
    return !(formErrors.email || formErrors.password || formErrors.username);
  }, [formErrors.email, formErrors.password, formErrors.username]);

  const passwordRules = useMemo((): TValidationRules[] => {
    return isSignUp ? ['required', 'password'] : ['required'];
  }, [isSignUp]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    touch();
    if (isFormValid) {
      submit(formData);
    }
  };

  const onError = (name: string, err: string) => {
    setFormErrors({ ...formErrors, [name]: err });
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className={styles['auth-form']} onSubmit={onSubmit} ref={form}>
      <h2 className={styles['auth-form__title']}>{formTitle}</h2>
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
      <AppPasswordInput
        value={formData.password}
        onChange={onInput}
        onError={onError}
        label={t('your_password')}
        required
        rules={passwordRules}
      />
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
