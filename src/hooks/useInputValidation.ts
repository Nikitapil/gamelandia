import { useEffect, useState } from 'react';
import { inputValidators, TValidationRules } from '../utils/validators';

export const useInputValidation = (
  value: string,
  rules: TValidationRules[]
) => {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (touched) {
      // eslint-disable-next-line no-restricted-syntax
      for (const validator of rules) {
        if (inputValidators[validator]) {
          const validationError = inputValidators[validator](value);
          setError(validationError);
          if (validationError) {
            break;
          }
        }
      }
    }
  }, [value, touched, rules]);

  const onBlur = () => {
    setTouched(true);
  };

  return { error, onBlur };
};
