import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ title, description, children, noindex = false }) {
  const router = useRouter();
  const canonical = `https://agenciagtx.com.br${router.asPath.split('?')[0]}`;

  return (
    <div className="site">
      <Head>
        <title>{title}</title>
        {description ? <meta name="description" content={description} /> : null}
        <meta property="og:title" content={title} />
        {description ? <meta property="og:description" content={description} /> : null}
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
        {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}
      </Head>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
    </div>
  );
}
