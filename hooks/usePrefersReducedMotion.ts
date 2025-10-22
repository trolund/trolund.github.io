'use client';

import { useSyncExternalStore } from 'react';

export const usePrefersReducedMotion = () => {
  // Function to read the current media query value
  const getPrefersReducedMotion = () =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return useSyncExternalStore(
    // Subscribe function: called to set up listener
    (callback) => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    // Snapshot function: returns current value
    getPrefersReducedMotion,
    // Server snapshot
    () => false
  );
};
