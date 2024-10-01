import Meta from './meta';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Meta />
      <div
        style={{ minHeight: 'calc(100vh - (var(--footer-height) + var(--menu-height) + 20px))' }}
      >
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
