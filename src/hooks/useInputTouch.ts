import { noop } from '../utils/helpers';

export const useInputTouch = (form: HTMLFormElement | null) => {
  if (!form) {
    const touch = noop;
    return { touch };
  }
  const touch = () => {
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      input.focus();
      input.blur();
    });
  };

  return { touch };
};
