import { ChangeEvent, FC, FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../assets/styles/auth.module.scss';
import { AppInput } from '../../../components/UI/AppInput/AppInput';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { TValidationRules } from '../../../utils/validators';
import { useInputTouch } from '../../../hooks/useInputTouch';
import { ISignUpAuthRequest } from '../../types';
import { AppPasswordInput } from '../../../components/UI/AppInput/AppPasswordInput';
import { RestorePasswordModal } from '../RestorePasswordModal/RestorePasswordModal';

interface AuthFormProps {
  formTitle: string;
  submit: (authData: ISignUpAuthRequest) => void;
  isSignUp?: boolean;
  isLoading: boolean;
}

export const AuthForm: FC<AuthFormProps> = ({ formTitle, submit, isLoading, isSignUp = false }) => {
  const { t } = useTranslation();

  const [isRestorePasswordModalOpened, setIsRestorePasswordModalOpened] = useState(false);

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

  const openRestorePasswordModal = () => setIsRestorePasswordModalOpened(true);
  const closeRestorePasswordModal = () => setIsRestorePasswordModalOpened(false);

  const onError = useCallback((name: string, err: string) => {
    setFormErrors((errors) => ({ ...errors, [name]: err }));
  }, []);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      className={styles['auth-form']}
      onSubmit={onSubmit}
      ref={form}
    >
      <h2 className={styles['auth-form__title']}>{formTitle}</h2>
      <AppInput
        type="email"
        name="email"
        value={formData.email}
        testId="email-input"
        label={t('your_email')}
        rules={['required', 'email']}
        disabled={isLoading}
        required
        onError={onError}
        onChange={onInput}
      />
      <AppPasswordInput
        value={formData.password}
        label={t('your_password')}
        rules={passwordRules}
        disabled={isLoading}
        required
        onError={onError}
        onChange={onInput}
      />
      {!isSignUp && (
        <AppButton
          text={t('restore_password')}
          customClass="align-self-start"
          color="dark"
          size="sm"
          onClick={openRestorePasswordModal}
        />
      )}
      {isSignUp && (
        <AppInput
          type="text"
          data-testid="display-name"
          name="username"
          testId="display-name"
          value={formData.username}
          label={t('your_name')}
          rules={['required']}
          disabled={isLoading}
          required
          onError={onError}
          onChange={onInput}
        />
      )}
      <AppButton
        customClass="mt-m"
        fullWidth
        type="submit"
        testId="submit"
        disabled={!isFormValid || isLoading}
      >
        {formTitle}
      </AppButton>
      <RestorePasswordModal
        isOpened={isRestorePasswordModalOpened}
        closeModal={closeRestorePasswordModal}
        initialEmail={formData.email}
      />
    </form>
  );
};
