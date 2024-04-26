import "../styles/index.css";
import "../styles/hamburgers.css";
import { AnimatePresence } from "framer-motion";
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
