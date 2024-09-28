import Head from 'next/head'

export default function Meta() {
  return (
    <Head>
      <meta
        name="description"
        content={`Personal website - Troels Lund`}
      />
      {/* <meta property="og:image" content={HOME_OG_IMAGE_URL} /> */}
    </Head>
  )
}