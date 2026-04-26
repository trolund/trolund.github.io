import Link from 'next/link';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

type LinkTransitionProps = PropsWithChildren<ComponentPropsWithoutRef<typeof Link>>;

export default function LinkTransition({ children, ...props }: LinkTransitionProps) {
  return <Link {...props}>{children}</Link>;
}
