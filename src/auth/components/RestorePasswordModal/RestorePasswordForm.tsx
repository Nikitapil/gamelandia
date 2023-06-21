import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppPasswordInput } from '../../../components/UI/AppInput/AppPasswordInput';
import { AppInput } from '../../../components/UI/AppInput/AppInput';
import styles from '../../assets/styles/auth.module.scss';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { useInputTouch } from '../../../hooks/useInputTouch';

interface IRestorePasswordFormProps {
  restorePassword: (key: string, password: string) => void;
}

export const RestorePasswordForm = ({ restorePassword }: IRestorePasswordFormProps) => {
  const { t } = useTranslation();

  const formRef = useRef(null);
  const { touch } = useInputTouch(formRef.current);

  const [values, setValues] = useState({
    newPassword: '',
    repeatedPassword: '',
    secretKey: ''
  });

  const [errors, setErrors] = useState({
    newPassword: '',
    repeatedPassword: '',
    secretKey: ''
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const isValid = useMemo(() => {
    return (
      !errors.newPassword &&
      !errors.repeatedPassword &&
      !errors.secretKey &&
      values.newPassword === values.repeatedPassword
    );
  }, [
    errors.secretKey,
    errors.newPassword,
    errors.repeatedPassword,
    values.newPassword,
    values.repeatedPassword
  ]);

  const onChangePassword = () => {
    touch();
    if (isValid && values.secretKey && values.newPassword) {
      restorePassword(values.secretKey, values.newPassword);
    }
  };

  return (
    <div
      ref={formRef}
      className={styles['password-form']}
    >
      <p className={styles['password-form__text']}>{t('secret_key_description')}</p>
      <AppInput
        type="text"
        name="secretKey"
        label={t('secret_key')}
        value={values.secretKey}
        rules={['required']}
        onChange={onInputChange}
        onError={onError}
      />
      <AppPasswordInput
        name="newPassword"
        label={t('new_password')}
        value={values.newPassword}
        rules={['required', 'password']}
        onChange={onInputChange}
        onError={onError}
      />
      <AppPasswordInput
        name="repeatedPassword"
        label={t('repeat_new_password')}
        value={values.repeatedPassword}
        rules={['required', 'password']}
        onChange={onInputChange}
        onError={onError}
      />
      <AppButton
        text={t('change')}
        customClass="ml-auto"
        size="lg"
        disabled={false}
        onClick={onChangePassword}
      />
    </div>
  );
};
