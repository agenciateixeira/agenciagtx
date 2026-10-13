import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { breadcrumbSchema, canonicalUrl } from '../../lib/seo';

export default function Layout({
  title,
  description,
  children,
  noindex = false,
  crumbs = [],
  showCrumbs = true,
  jsonLd = [],
}) {
  const router = useRouter();
  const canonical = canonicalUrl(router.asPath.split('?')[0]);
  const schema = [
    ...jsonLd,
    ...(crumbs.length ? [breadcrumbSchema(crumbs)] : []),
  ];

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
        {schema.map((data) => (
          <script
            key={data['@type']}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </Head>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        {showCrumbs && crumbs.length > 1 ? (
          <nav className="crumbs" aria-label="Trilha">
            <div className="shell">
              <ol>
                {crumbs.map((crumb, index) => {
                  const last = index === crumbs.length - 1;
                  return (
                    <li key={crumb.href}>
                      {last ? crumb.label : <Link href={crumb.href}>{crumb.label}</Link>}
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>
        ) : null}
        {children}
      </main>
      <Footer />
    </div>
  );
}
