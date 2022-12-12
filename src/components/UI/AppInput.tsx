import React, { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import appInputStyles from '../../styles/appInput.module.scss';
import { useInputValidation } from '../../hooks/useInputValidation';
import { TValidationRules } from '../../utils/validators';
import { noop } from '../../utils/helpers';

interface IAppInputProps {
  className?: string;
  type: 'text' | 'email' | 'password';
  testId?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
  rules?: TValidationRules[];
  onError?: (name: string, error: string) => void;
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
  rules = [],
  onError = noop
}: IAppInputProps) => {
  const { error, onBlur } = useInputValidation(value, rules);

  const id = useMemo(() => {
    return uuidv4();
  }, []);

  const classNameValue = useMemo(() => {
    return value ? appInputStyles['with-content'] : '';
  }, [value]);

  useEffect(() => {
    onError(name, error);
  }, [error, name]);

  return (
    <div
      className={`${appInputStyles['app-input']} ${className || ''} ${
        error ? appInputStyles.error : ''
      }`}
    >
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
      />
      {label && <label htmlFor={id}>{label}</label>}
      {error && <p>{error}</p>}
    </div>
  );
};
