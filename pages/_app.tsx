import { Slide, ToastContainer } from 'react-toastify';
import { ThemeProvider, useTheme } from '../hooks/ThemeContext';
import '../styles/index.css';
import Head from 'next/head';
import Toast from '../components/Toast';

type AppProps = {
  Component: any;
  pageProps: any;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
      <Toast />
    </ThemeProvider>
  );
}
