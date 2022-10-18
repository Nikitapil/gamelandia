import React, { ReactElement, ReactNode, useMemo } from 'react';
import styles from '../../styles/appButton.module.scss';
import { noop } from '../../utils/helpers';

interface AppButtonProps {
  children?: ReactNode | ReactElement;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  color?: 'primary' | 'success' | 'danger' | 'dark' | 'transparent';
  rounded?: boolean;
  customClass?: string;
  testId?: string;
}

export const AppButton = ({
  children,
  text,
  size = 'md',
  color = 'primary',
  fullWidth = false,
  rounded = true,
  onClick = noop,
  type = 'button',
  disabled = false,
  customClass = '',
  testId = ''
}: AppButtonProps) => {
  const className = useMemo(() => {
    const sizeClass = styles[size];
    const colorClass = styles[color];
    const widthClass = fullWidth ? styles['full-width'] : '';
    const roundedClass = rounded ? styles.rounded : '';
    return `${styles['app-button']} ${sizeClass} ${colorClass} ${widthClass} ${roundedClass} ${customClass}`;
  }, [color, customClass, fullWidth, rounded, size]);

  return (
    <button
      disabled={disabled}
      type={type}
      className={className}
      onClick={onClick}
      data-testid={testId}
    >
      {text || children}
    </button>
  );
};
