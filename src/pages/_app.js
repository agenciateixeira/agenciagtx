import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // GTX Session Tracking - Registra cada visita ao site
    import('../lib/sessionTracking')
      .then((module) => {
        module.trackSession()
          .then((session) => {
            if (session) {
              console.log('[GTX] ✅ Sessão registrada:', session.id);

              // Busca quantas sessões o usuário já teve
              module.getUserSessionCount().then((count) => {
                console.log(`[GTX] 📊 Total de sessões do usuário: ${count}`);
              });

              // Verifica se usuário já converteu antes
              module.getUserInfo().then((user) => {
                if (user) {
                  console.log(`[GTX] 👤 Usuário retornando: ${user.nome}`);
                }
              });
            }
          })
          .catch((error) => {
            console.error('[GTX] Erro ao rastrear sessão:', error);
          });
      });

    // Meta Pixel
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(process.env.NEXT_PUBLIC_META_PIXEL_ID)
        ReactPixel.pageView()

        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      })

    // Google Analytics / GTM
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: router.asPath
      })
    }
  }, [router.events, router.asPath])

  return <Component {...pageProps} />
}

export default MyApp
