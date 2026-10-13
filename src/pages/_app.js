import '../styles/globals.css'
import '../styles/site.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { trackGaEvent } from '../lib/ga4'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
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

  return <Component {...pageProps} />
}

export default MyApp
