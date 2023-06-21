import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppInput } from '../../../components/UI/AppInput/AppInput';
import { AppButton } from '../../../components/UI/AppButton/AppButton';
import { useInputTouch } from '../../../hooks/useInputTouch';

interface IRestoreEmailFormProps {
  initialValue: string;
  next: (value: string) => void;
}

export const RestoreEmailForm = ({ initialValue, next }: IRestoreEmailFormProps) => {
  const { t } = useTranslation();

  const [value, setValue] = useState(initialValue);
  const [valueError, setValueError] = useState('');

  const formRef = useRef(null);
  const { touch } = useInputTouch(formRef.current);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onInputError = useCallback((name: string, error: string) => {
    setValueError(error);
  }, []);

  const onNextStep = () => {
    touch();
    if (!valueError) {
      next(value);
    }
  };

  const isButtonDisabled = useMemo(() => {
    return !value || !!valueError;
  }, [value, valueError]);

  return (
    <div ref={formRef}>
      <AppInput
        type="text"
        name="restore-email"
        className="mt-m mb-m"
        value={value}
        label="Email"
        rules={['required', 'email']}
        onChange={onChange}
        onError={onInputError}
      />
      <AppButton
        text={t('next')}
        customClass="ml-auto"
        size="lg"
        disabled={isButtonDisabled}
        onClick={onNextStep}
      />
    </div>
  );
};
