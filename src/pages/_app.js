import '../styles/globals.css'
import '../styles/site.css'
import '../styles/portfolio.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import localFont from 'next/font/local'
import { trackGaEvent } from '../lib/ga4'
import { loadTrackers } from '../lib/loadTrackers'

// Fonte da marca, servida pelo próprio site (subconjunto latino, woff2).
const roboto = localFont({
  src: [{ path: '../fonts/RobotoCondensed-var.woff2', weight: '300 700', style: 'normal' }],
  variable: '--font-roboto-cond',
  display: 'swap',
  adjustFontFallback: 'Arial',
})

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    loadTrackers()
    import('../lib/sessionTracking')
      .then((module) => {
        module.trackSession().catch(() => {})
      })

    const onRoute = (url) => {
      if (typeof window === 'undefined') return
      if (window.fbq) window.fbq('track', 'PageView')
      trackGaEvent('page_view', { page_path: url })
    }

    router.events.on('routeChangeComplete', onRoute)
    return () => router.events.off('routeChangeComplete', onRoute)
  }, [router.events])

  return (
    <div className={`${roboto.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
