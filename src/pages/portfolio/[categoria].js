import Layout from '../../components/site/Layout';
import PortfolioPage from '../../components/pf/PortfolioPage';
import { bySlug, categories, tiles } from '../../lib/portfolio';

export default function Categoria({ slug }) {
  const cat = categories.find((c) => c.slug === slug);
  const list = tiles.filter((t) => bySlug(t.slug).category === slug);
  return (
    <Layout
      variant="pf"
      title={`${cat.label} | Portfólio GTX`}
      description={`Trabalhos de ${cat.label.toLowerCase()} feitos pela GTX.`}
      crumbs={[{ href: '/', label: 'Início' }, { href: '/portfolio', label: 'Portfólio' }, { href: `/portfolio/${slug}`, label: cat.label }]}
    >
      <h1 className="pf-sr">{`Portfólio GTX: ${cat.label}`}</h1>
      <PortfolioPage label={cat.label} list={list} current={slug} />
    </Layout>
  );
}

export function getStaticPaths() {
  return { paths: categories.map((c) => ({ params: { categoria: c.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { slug: params.categoria } };
}
