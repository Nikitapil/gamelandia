import React, { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import styles from './app-input.module.scss';
import { useInputValidation } from './hooks/useInputValidation';
import { TValidationRules } from '../../../utils/validators';
import { noop } from '../../../utils/helpers';

interface IAppInputProps {
  type: 'text' | 'email' | 'password';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testId?: string;
  className?: string;
  label?: string;
  required?: boolean;
  rules?: TValidationRules[];
  onError?: (name: string, error: string) => void;
  disabled?: boolean;
}

export const AppInput = ({
  type,
  testId,
  name,
  value,
  onChange,
  label,
  className,
  required,
  disabled = false,
  rules = [],
  onError = noop
}: IAppInputProps) => {
  const { t } = useTranslation();
  const { error, onBlur } = useInputValidation(value, rules);

  const id = useMemo(() => {
    return uuidv4();
  }, []);

  const classNameValue = useMemo(() => {
    return value ? styles['with-content'] : '';
  }, [value]);

  const containerClassName = useMemo(() => {
    const classes = [styles['app-input'], className];
    if (error) {
      classes.push(styles.error);
    }
    return classes.join(' ');
  }, [className, error]);

  useEffect(() => {
    onError(name, error);
  }, [error, name, onError]);

  return (
    <div className={containerClassName}>
      <input
        type={type}
        data-testid={testId}
        name={name}
        value={value}
        onChange={onChange}
        id={id}
        className={classNameValue}
        required={required || false}
        onBlur={onBlur}
        disabled={disabled}
      />
      {label && <label htmlFor={id}>{label}</label>}
      {error && <p>{t(error)}</p>}
    </div>
  );
};
