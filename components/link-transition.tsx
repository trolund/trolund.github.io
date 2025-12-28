'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent, PropsWithChildren } from 'react';

type LinkTransitionProps = PropsWithChildren<LinkProps> & {
  className?: string;
};

function LinkTransition({ href, children, className, ...rest }: LinkTransitionProps) {
  const router = useRouter();
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!document.startViewTransition) {
      // browser does not support view transition. Continue the default behavior.
      return;
    } else {
      // browser supports view transition. Animate the transition.
      e.preventDefault();
      document.startViewTransition(async () => {
        router.push(href as any);
      });
    }
  };

  return (
    <Link onClick={handleClick} href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
export default LinkTransition;
