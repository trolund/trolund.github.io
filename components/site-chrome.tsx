import type { ReactNode } from 'react';
import menuItems from '@/constants/menu';
import NavBar from './nav-bar';
import Layout from './layout';
import { cn } from '@/lib/utils';

type BaseChromeProps = {
  children: ReactNode;
  navNoBackground?: boolean;
};

type ImmersivePageProps = BaseChromeProps & {
  mainClassName?: string;
};

type ContainedPageProps = BaseChromeProps & {
  layoutClassName?: string;
  navSpacing?: boolean;
};

export function ImmersivePage({
  children,
  mainClassName,
  navNoBackground = false,
}: ImmersivePageProps) {
  return (
    <>
      <NavBar items={menuItems} noBackground={navNoBackground} />
      <main id="main-content" className={cn('overflow-x-hidden', mainClassName)}>
        {children}
      </main>
    </>
  );
}

export function ContainedPage({
  children,
  layoutClassName,
  navSpacing = true,
  navNoBackground = false,
}: ContainedPageProps) {
  return (
    <>
      <NavBar items={menuItems} spacing={navSpacing} noBackground={navNoBackground} />
      <Layout>
        {layoutClassName ? <div className={layoutClassName}>{children}</div> : children}
      </Layout>
    </>
  );
}
