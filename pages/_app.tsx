import { ThemeProvider } from '../hooks/ThemeContext';
import '../styles/index.css';
import Toast from '../components/toast';
import { useCronitor } from '../hooks/useCronitor';
import Meta from '../components/meta';
import { StrictMode } from 'react';

type AppProps = {
  Component: any;
  pageProps: any;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  useCronitor(process.env.NEXT_PUBLIC_CRONITORIO_CLIENT_KEY ?? '');
  return (
    <StrictMode>
      <ThemeProvider>
        <Meta />
        <Component {...pageProps} />
        <Toast />
      </ThemeProvider>
    </StrictMode>
  );
}
