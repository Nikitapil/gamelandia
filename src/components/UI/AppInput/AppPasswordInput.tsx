import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import styles from './app-input.module.scss';
import { AppInput } from './AppInput';
import { TValidationRules } from '../../../utils/validators';

interface IAppPasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onError?: (name: string, error: string) => void;
  label?: string;
  required?: boolean;
  rules?: TValidationRules[];
  disabled?: boolean;
}

export const AppPasswordInput = ({
  value,
  onChange,
  onError,
  label,
  required,
  rules,
  disabled = false
}: IAppPasswordInputProps) => {
  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');

  const onChangePasswordType = () => {
    const newPasswordType = passwordType === 'text' ? 'password' : 'text';
    setPasswordType(newPasswordType);
  };

  return (
    <div className={styles['password-input']}>
      <AppInput
        type={passwordType}
        name="password"
        className={styles['password-input__field']}
        testId="password-input"
        value={value}
        onChange={onChange}
        onError={onError}
        label={label}
        required={required}
        rules={rules}
        disabled={disabled}
      />
      <button
        type="button"
        title="Show password"
        className={passwordType === 'text' ? styles.active : ''}
        onClick={onChangePasswordType}
      >
        <FontAwesomeIcon icon={faEye} />
      </button>
    </div>
  );
};
