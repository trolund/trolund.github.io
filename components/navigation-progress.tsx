'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';

let resolveViewTransition: (() => void) | null = null;

export function setViewTransitionResolver(resolve: () => void) {
  // Resolve any in-flight transition before replacing it — prevents the
  // browser timing out a Promise that will never be called.
  resolveViewTransition?.();
  resolveViewTransition = resolve;
}

/**
 * Headless component that resolves the pending view-transition promise once
 * Next.js has committed the new route to the DOM (useLayoutEffect fires after
 * DOM mutations, before the browser paints — giving the View Transitions API
 * a clean snapshot of the new page).
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useLayoutEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      resolveViewTransition?.();
      resolveViewTransition = null;
    }
  }, [pathname]);

  return null;
}
