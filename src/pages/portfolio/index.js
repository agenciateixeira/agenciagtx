import Layout from '../../components/site/Layout';
import PortfolioPage from '../../components/pf/PortfolioPage';
import { tiles } from '../../lib/portfolio';

export default function Portfolio() {
  return (
    <Layout
      variant="pf"
      title="Portfólio | GTX"
      description="Lojas Shopify, sistemas e mídia paga feitos pela GTX."
      crumbs={[{ href: '/', label: 'Início' }, { href: '/portfolio', label: 'Portfólio' }]}
    >
      <h1 className="pf-sr">Portfólio da GTX</h1>
      <PortfolioPage label="Portfólio" list={tiles} />
    </Layout>
  );
}
