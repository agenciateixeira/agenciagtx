import Layout from '../components/site/Layout';
import Contact from '../components/vt/Contact';
import { WorkGrid, Statement, Works, Services, Process } from '../components/vt/HomeSections';

export default function Home() {
  return (
    <Layout
      variant="vt"
      title="GTX | Lojas Shopify, mídia paga e IA"
      description="Lojas Shopify sob medida, mídia paga, implantação de IA, landing pages e sistemas. A GTX constrói o que a sua empresa vende e opera. Diagnóstico de 30 minutos."
      crumbs={[{ href: '/', label: 'Início' }]}
    >
      <WorkGrid />
      <Statement />
      <Works />
      <Services />
      <Process />
      <Contact />
    </Layout>
  );
}
