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
  useCronitor(process.env.NEXT_PUBLIC_CRONITORIO_CLIENT_KEY ?? '');
  console.log('client key:', process.env.NEXT_PUBLIC_CRONITORIO_CLIENT_KEY);
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
