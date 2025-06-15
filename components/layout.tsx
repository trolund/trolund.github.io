import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div
        style={{ minHeight: 'calc(100vh - (var(--footer-height) + var(--menu-height) + 20px))' }}
      >
        <main className={'z-30 transition-all'}>{children}</main>
      </div>
      <Footer />
    </>
  );
}
