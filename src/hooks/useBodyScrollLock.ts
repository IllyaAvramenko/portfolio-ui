import { useEffect } from 'react';

export const useBodyScrollLock = (isLocked: boolean): void => {
  useEffect(() => {
    document.body.style.overflow = isLocked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);
};
