import { useEffect } from 'react';

export const useTitle = (title?: string) => {
  useEffect(() => {
    if (title) {
      document.title = `Gamelandia | ${title}`;
    } else {
      document.title = 'Gamelandia';
    }
  }, [title]);
};
