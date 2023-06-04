import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IAppRadioButtonOption } from './types';
import { AppButton } from '../AppButton/AppButton';

interface IAppRadioButtonProps<T> {
  options: IAppRadioButtonOption<T>[];
  value: T;
  setValue: (value: T) => void;
  dataTestId?: string;
}

export const AppRadioButton = <T,>({
  options,
  value,
  setValue,
  dataTestId = ''
}: IAppRadioButtonProps<T>) => {
  return (
    <div className="d-flex gap-10">
      {options.map((option) => (
        <AppButton
          key={uuidv4()}
          size="sm"
          color={value === option.value ? 'success' : 'primary'}
          onClick={() => setValue(option.value)}
          type="button"
          text={option.text}
          testId={`${option.text}-${dataTestId}`}
        />
      ))}
    </div>
  );
};
