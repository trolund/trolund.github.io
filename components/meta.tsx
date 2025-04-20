import Head from 'next/head';

export default function Meta() {
  return (
    <Head>
      <meta name="description" content={`Personal website - Troels Lund`} />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
}
