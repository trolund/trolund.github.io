'use client';

import { useSyncExternalStore } from 'react';

export const usePrefersReducedTransparency = () => {
  const getPrefersReducedTransparency = () =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-transparency: reduce)').matches
      : false;

  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia('(prefers-reduced-transparency: reduce)');
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    getPrefersReducedTransparency,
    () => false, // server snapshot
  );
};
