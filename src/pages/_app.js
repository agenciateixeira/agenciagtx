import '../styles/globals.css'
import '../styles/site.css'
import '../styles/vitrine.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import localFont from 'next/font/local'
import { trackGaEvent } from '../lib/ga4'
import { loadTrackers } from '../lib/loadTrackers'

// Fontes da marca, servidas pelo próprio site (subconjunto latino, woff2).
const fustat = localFont({
  src: [
    { path: '../fonts/Fustat-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/Fustat-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/Fustat-600.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/Fustat-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-fustat',
  display: 'swap',
  adjustFontFallback: 'Arial',
})
const lora = localFont({
  src: [
    { path: '../fonts/Lora.woff2', weight: '400 700', style: 'normal' },
    { path: '../fonts/Lora-Italic.woff2', weight: '400 700', style: 'italic' },
  ],
  variable: '--font-lora',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})
const plex = localFont({
  src: [
    { path: '../fonts/PlexMono-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/PlexMono-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-plex',
  display: 'swap',
  adjustFontFallback: false,
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
    <div className={`${fustat.variable} ${lora.variable} ${plex.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
