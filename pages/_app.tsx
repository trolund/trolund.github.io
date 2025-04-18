import { ThemeProvider } from '../hooks/ThemeContext';
import '../styles/index.css';
import Head from 'next/head';
import Toast from '../components/toast';
import { useCronitor } from '../hooks/useCronitor';

type AppProps = {
  Component: any;
  pageProps: any;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  useCronitor('771126b2208f23bec2650fa1e0e668b7');
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
