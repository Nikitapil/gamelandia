import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import appInputStyles from '../../styles/appInput.module.scss';

interface IAppInputProps {
  className?: string;
  type: 'text' | 'email' | 'password';
  testId?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
}

export const AppInput = ({
  type,
  testId,
  name,
  value,
  onChange,
  label,
  className,
  required
}: IAppInputProps) => {
  const id = useMemo(() => {
    return uuidv4();
  }, []);

  const classNameValue = useMemo(() => {
    return value ? appInputStyles['with-content'] : '';
  }, [value]);

  return (
    <div className={`${appInputStyles['app-input']} ${className || ''}`}>
      <input
        type={type}
        data-testid={testId}
        name={name}
        value={value}
        onChange={onChange}
        id={id}
        className={classNameValue}
        required={required || false}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};
