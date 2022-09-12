import Head from 'next/head'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sparkle Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Component {...pageProps} />
    </>
  )
}

export default MyApp
