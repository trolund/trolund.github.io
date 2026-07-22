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
        <main id="main-content" tabIndex={-1} className="z-30 outline-hidden">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
