import Layout from '../../components/site/Layout';
import FineTuneCase from '../../components/vt/FineTuneCase';

export default function FineTuneOnMinis() {
  return (
    <Layout
      variant="vt"
      title="Fine Tune on Minis | Case GTX"
      description="Loja Shopify de miniaturas diecast 1:64 customizadas: tema sob medida, páginas de produto, carrinho Pit Stop e integrações. Case da GTX."
      crumbs={[
        { href: '/', label: 'Início' },
        { href: '/cases', label: 'Cases' },
        { href: '/cases/fine-tune-on-minis', label: 'Fine Tune on Minis' },
      ]}
    >
      <FineTuneCase />
    </Layout>
  );
}
