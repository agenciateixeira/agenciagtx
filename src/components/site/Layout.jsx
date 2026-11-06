import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../pf/Header';
import Footer from '../pf/Footer';
import { breadcrumbSchema, canonicalUrl } from '../../lib/seo';

export default function Layout({
  title,
  description,
  children,
  noindex = false,
  crumbs = [],
  showCrumbs = true,
  jsonLd = [],
  variant = 'site',
}) {
  const router = useRouter();
  const canonical = canonicalUrl(router.asPath.split('?')[0]);

  useEffect(() => {
    const root = document.getElementById('conteudo');
    if (!root || variant === 'pf') return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = [...root.querySelectorAll('.section, .proof, .contact')];
    if (reduce) {
      nodes.forEach((node) => node.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) node.classList.add('is-in');
      node.classList.add('reveal');
      io.observe(node);
    });
    return () => io.disconnect();
  }, [router.asPath, variant]);
  const schema = [
    ...jsonLd,
    ...(crumbs.length ? [breadcrumbSchema(crumbs)] : []),
  ];

  return (
    <>
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
      <div className="pf">
        <a className="pf-skip" href="#conteudo">Pular para o conteúdo</a>
        <Header />
      </div>
      {variant === 'pf' ? (
        <main id="conteudo" className="pf pf-main">{children}</main>
      ) : (
        <div className="site pf-offset">
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
        </div>
      )}
      <div className="pf">
        <Footer />
      </div>
    </>
  );
}
