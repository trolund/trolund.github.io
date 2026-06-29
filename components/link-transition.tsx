'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setViewTransitionResolver } from './navigation-progress';
import type { ComponentPropsWithoutRef, MouseEvent, PropsWithChildren } from 'react';

type LinkTransitionProps = PropsWithChildren<ComponentPropsWithoutRef<typeof Link>>;

// Module-level so it persists across re-renders
let activeTransition: { skipTransition: () => void } | null = null;

export default function LinkTransition({ children, href, onClick, ...props }: LinkTransitionProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const hrefStr = href.toString();
    if (!hrefStr.startsWith('/')) return;

    e.preventDefault();

    if (!document.startViewTransition) {
      router.push(hrefStr);
      return;
    }

    // Explicitly skip any in-flight transition — this tells the browser to
    // stop waiting for the previous Promise, preventing the TimeoutError.
    activeTransition?.skipTransition();
    activeTransition = null;

    const transition = document.startViewTransition(() => {
      return new Promise<void>((resolve) => {
        setViewTransitionResolver(resolve);
        router.push(hrefStr);
        // Failsafe: resolve before the browser's hard 4s timeout.
        // Static-site navigation always finishes well under 500ms, so
        // useLayoutEffect in NavigationProgress wins the race in normal cases.
        setTimeout(resolve, 500);
      });
    });

    activeTransition = transition;
    // Swallow rejection — skipTransition() or the failsafe can cause the browser
    // to reject finished; the navigation itself still completes correctly.
    transition.finished
      .catch(() => {})
      .finally(() => {
        activeTransition = null;
        // Route focus to main content so keyboard/AT users get context after the transition
        (document.getElementById('main-content') as HTMLElement | null)?.focus({
          preventScroll: true,
        });
      });
  };

  return (
    <Link {...props} href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
