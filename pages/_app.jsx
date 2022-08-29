import Header from '../components/header'
import Head from 'next/head'
import '../styles/globals.scss'
import { TimelineAnimationWrapper } from '../components/TimelineWrapper'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sparkle Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Header /> */}
      <TimelineAnimationWrapper>
        <Component {...pageProps} />
      </TimelineAnimationWrapper>
    </>
  )
}

export default MyApp
