import { Html, Head, Main, NextScript } from 'next/document'

import { getCountryCode } from '../@sw-npm-packages/config'

export default function Document() {
  return (
    <Html lang="en" className="notranslate" translate="no">
      <Head>
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
        <meta name="theme-color" content="#000" /> */}
        <script
          async
          src="https://checkout.razorpay.com/v1/checkout.js"
        ></script>
        {getCountryCode() === 'NZ' ? (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PGDDSC9');`
              }}
            ></script>
          </>
        ) : (
          <>
            <meta name={'not-nz-ads'} />
          </>
        )}
      </Head>
      <body>
        <noscript>
          <iframe
            src="<https://www.googletagmanager.com/ns.html?id=GTM-PGDDSC9>"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
