import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/site/Layout';
import { Tile } from '../../components/pf/Grid';
import { ArrowLeft, ArrowRight, Chevron } from '../../components/pf/Icons';
import { bySlug, cases } from '../../lib/portfolio';

export default function CasePage({ slug }) {
  const item = bySlug(slug);
  const i = cases.findIndex((c) => c.slug === slug);
  const prev = cases[(i - 1 + cases.length) % cases.length];
  const next = cases[(i + 1) % cases.length];
  const more = [1, 2, 3].map((k) => cases[(i + k) % cases.length]);

  return (
    <Layout
      variant="pf"
      title={`${item.client} | ${item.project} | GTX`}
      description={item.summary[0]}
      crumbs={[{ href: '/', label: 'Início' }, { href: '/portfolio', label: 'Portfólio' }, { href: `/cases/${slug}`, label: item.client }]}
    >
      <article className="pf-c pf-single">
        <nav className="pf-single-nav" aria-label="Navegação entre cases">
          <Link href={`/cases/${prev.slug}`} rel="prev"><ArrowLeft />Anterior</Link>
          <Link href={`/cases/${next.slug}`} rel="next">Próximo<ArrowRight /></Link>
        </nav>

        <header className="pf-single-h">
          <h1>{item.client}</h1>
          <p className="pf-single-sub">{item.project}</p>
        </header>

        <div className="pf-single-txt">
          {item.summary.map((p) => <p key={p}>{p}</p>)}
          {item.site ? (
            <p><a href={item.site.href} target="_blank" rel="noopener noreferrer">{item.site.label}</a></p>
          ) : null}
        </div>

        <div className="pf-single-gal">
          {item.result ? (
            <>
              <Image src={item.cover.src} alt={item.cover.alt} width={1600} height={1200} sizes="(max-width: 1200px) 100vw, 1140px" priority />
              <div className="pf-result" role="img" aria-label={`De ${item.result.from} para mais de ${item.result.to} ${item.result.note}`}>
                <span>De {item.result.from}</span>
                <b>Para mais de {item.result.to}</b>
                <small>{item.result.note}</small>
              </div>
            </>
          ) : null}
          {item.gallery.map((g, k) => (
            <Image key={g.src} src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(max-width: 1200px) 100vw, 1140px" priority={k === 0} />
          ))}
        </div>

        <div className="pf-single-cta">
          <Link className="pf-btn" href="/contato">Fale com a gente<Chevron /></Link>
        </div>

        <section className="pf-more" aria-labelledby="pf-more-t">
          <h2 id="pf-more-t">Veja também</h2>
          <div className="pf-grid">
            {more.map((c) => (
              <Tile key={c.slug} href={`/cases/${c.slug}`} client={c.client} title={c.project} src={c.cover.src} alt={c.cover.alt} />
            ))}
          </div>
        </section>
      </article>
    </Layout>
  );
}

export function getStaticPaths() {
  return { paths: cases.map((c) => ({ params: { slug: c.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}
