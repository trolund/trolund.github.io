import { ThemeProvider } from '../hooks/ThemeContext';
import '../styles/index.css';
import Head from 'next/head';
import Toast from '../components/toast';
import { useCronitor } from '../hooks/useCronitor';
import Meta from '../components/meta';

type AppProps = {
  Component: any;
  pageProps: any;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  useCronitor(process.env.NEXT_PUBLIC_CRONITORIO_CLIENT_KEY ?? '');
  return (
    <ThemeProvider>
      <Meta />
      <Component {...pageProps} />
      <Toast />
    </ThemeProvider>
  );
}
