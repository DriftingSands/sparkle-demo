import { Html, Head, Main, NextScript } from 'next/document'
// import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en" >
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <link rel="DNS-prefetch" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://use.typekit.net" crossorigin />
        <link rel="DNS-prefetch" href="https://p.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossorigin />
        <link rel="stylesheet" href="https://use.typekit.net/bud6jdy.css" />

        {/* <Script id='testScript' src='/test.js' /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}