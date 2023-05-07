import { RefObject, useEffect } from 'react';

export const useFocus = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);
};
