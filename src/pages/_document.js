import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { siteGraph } from '../lib/seo'
import { GA_MEASUREMENT_ID } from '../lib/ga4'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/images/favicon.png" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.agenciagtx.com.br/api/og" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="twitter:card" content="summary_large_image" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteGraph),
          }}
        />

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              /* fbevents.js e gtag.js entram depois, por src/lib/loadTrackers.js; as chamadas abaixo ficam na fila */
              fbq('init', '611003988383118');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=611003988383118&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        
        <Script id="ga4" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', '${GA_MEASUREMENT_ID}');
            window.gtag('config', 'AW-16834266345');
          `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}