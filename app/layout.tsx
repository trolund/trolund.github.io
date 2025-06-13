'use client';

import '../styles/index.css';
import { ThemeProvider } from '../hooks/ThemeContext';
import Toast from '../components/toast';
import { ReactNode, StrictMode } from 'react';
import { useCronitor } from '../hooks/useCronitor';

export default function RootLayout({ children }: { children: ReactNode }) {
  useCronitor(process.env.NEXT_PUBLIC_CRONITORIO_CLIENT_KEY ?? '');

  return (
    <html lang="en">
      <head />
      <body>
        <StrictMode>
          <ThemeProvider>
            {children}
            <Toast />
          </ThemeProvider>
        </StrictMode>
      </body>
    </html>
  );
}
