import Link from 'next/link';
import Layout from '../components/site/Layout';
import PageHead from '../components/pf/PageHead';
import { Chevron } from '../components/pf/Icons';

export default function Sobre() {
  return (
    <Layout
      variant="pf"
      title="Quem somos | GTX"
      description="GTX Gestão e Implementações Digitais, desde 2017, atendimento remoto no Brasil. Lojas Shopify, sistemas, mídia paga e implantação de IA."
      crumbs={[{ href: '/', label: 'Início' }, { href: '/sobre', label: 'Quem somos' }]}
    >
      <div className="pf-c pf-page">
        <PageHead label="Quem somos" title={<>Construímos o que<br />a sua empresa vende<br />e opera</>}>
          <p>A GTX Gestão e Implementações Digitais nasceu em 2017 e atende de forma remota em todo o Brasil.</p>
          <p>Fazemos lojas Shopify sob medida, sistemas de gestão, landing pages e mídia paga no Meta, no Google e no LinkedIn. A IA entra no desenho, na construção e na operação de cada projeto.</p>
          <p>A conversa é direta com Guilherme Teixeira, fundador da GTX, com 9 anos em growth marketing. Se não fizer sentido para a sua operação, a gente diz.</p>
        </PageHead>
        <div className="pf-page-cta">
          <Link className="pf-btn" href="/contato">Fale com a gente<Chevron /></Link>
        </div>
      </div>
    </Layout>
  );
}
