import Footer from './Footer';
import transStyles from '../styles/view-trans.module.css';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div
        style={{ minHeight: 'calc(100vh - (var(--footer-height) + var(--menu-height) + 20px))' }}
      >
        <main className={cn('z-30 transition-all', transStyles.main)}>{children}</main>
      </div>
      <Footer />
    </>
  );
}
