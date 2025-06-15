'use client';

import { useEffect, useState } from 'react';

export const usePrefersReducedTransparency = () => {
  const [prefersReducedTransparency, setPrefersReducedTransparency] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-transparency: reduce)');

    // Set the initial value
    setPrefersReducedTransparency(mediaQuery.matches);

    // Define a handler to update the value when it changes
    const handleChange = () => {
      setPrefersReducedTransparency(mediaQuery.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedTransparency;
};
