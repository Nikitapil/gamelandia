import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContainer } from '../../../components/UI/ModalContainer/ModalContainer';
import { AppPasswordInput } from '../../../components/UI/AppInput/AppPasswordInput';
import { AppButton } from '../../../components/UI/AppButton/AppButton';

interface IChangePasswordModalProps {
  isOpened: boolean;
  closeModal: () => void;
}

export const ChangePasswordModal = ({ closeModal, isOpened }: IChangePasswordModalProps) => {
  const { t } = useTranslation();

  const [values, setValues] = useState({
    password: '',
    repeatedPassword: ''
  });

  const [errors, setErrors] = useState({
    password: '',
    repeatedPassword: ''
  });

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onError = useCallback((name: string, error: string) => {
    setErrors((errs) => ({ ...errs, [name]: error }));
  }, []);

  const isSubmitAvailable = useMemo(() => {
    return (
      !!values.password &&
      values.password === values.repeatedPassword &&
      !errors.password &&
      !errors.repeatedPassword
    );
  }, [errors.password, errors.repeatedPassword, values.password, values.repeatedPassword]);

  return (
    <ModalContainer
      closeModal={closeModal}
      isOpened={isOpened}
      title={`${t('change')} ${t('password')}`}
      bg="dark"
    >
      <div className="mt-m mb-m">
        <AppPasswordInput
          value={values.password}
          onChange={onChangeValue}
          name="password"
          rules={['required', 'password']}
          label={t('new_password')}
          onError={onError}
        />
        <AppPasswordInput
          value={values.repeatedPassword}
          onChange={onChangeValue}
          name="repeatedPassword"
          rules={['required', 'password']}
          label={t('repeat_new_password')}
          onError={onError}
        />
      </div>
      <div className="d-flex gap-10">
        <AppButton
          text={t('cancel')}
          color="danger"
          size="lg"
          onClick={closeModal}
        />
        <AppButton
          text={t('change')}
          color="success"
          size="lg"
          disabled={!isSubmitAvailable}
        />
      </div>
    </ModalContainer>
  );
};
