import Layout from '../components/site/Layout';
import Grid from '../components/pf/Grid';
import { tiles } from '../lib/portfolio';

export default function Home() {
  return (
    <Layout
      variant="pf"
      title="GTX | Portfólio de lojas Shopify, sistemas e mídia paga"
      description="Portfólio da GTX: lojas Shopify sob medida, sistemas de gestão, mídia paga e implantação de IA. Fine Tune on Minis, Fluido e Pool, Four Custom Garage e Sneaker Society."
      crumbs={[{ href: '/', label: 'Início' }]}
    >
      <h1 className="pf-sr">GTX, portfólio de lojas Shopify, sistemas e mídia paga</h1>
      <Grid tiles={tiles} />
    </Layout>
  );
}
