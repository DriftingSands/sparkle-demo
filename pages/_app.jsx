import Head from "next/head";
import Script from 'next/script'
import "../styles/globals.scss";
import { TimelineAnimationWrapper } from "../components/TimelineWrapper";
import ResizeProvider from "../components/ResizeProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sparkle Demo</title>
      </Head>

      <Script id='testScript' src='/dataFetch.js' strategy='beforeInteractive' />
      <ResizeProvider>
        <TimelineAnimationWrapper>
          <Component {...pageProps} />
        </TimelineAnimationWrapper>
      </ResizeProvider>
    </>
  );
}

export default MyApp;
