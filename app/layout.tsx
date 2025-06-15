import '@/styles/index.css';
import Toast from '@/components/toast';
import { ReactNode, StrictMode } from 'react';
import ClientInit from './client-init';
import { ThemeProvider } from 'next-themes';
import Head from '@/components/head';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <Head />
      <body>
        <StrictMode>
          <ThemeProvider enableSystem={true}>
            {children}
            <ClientInit />
            <Toast />
          </ThemeProvider>
        </StrictMode>
      </body>
    </html>
  );
}
