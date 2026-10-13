import Layout from '../../../components/site/Layout';
import { CardsPreview } from '../../../components/site/ComoPreviews';

export default function PreviewB() {
  return (
    <Layout
      title="Cartões | GTX"
      description="Protótipo de cartões com ícone para o diagnóstico, o plano e o acompanhamento."
      noindex
      showCrumbs={false}
    >
      <section className="section proto">
        <div className="shell">
          <p className="eyebrow">Protótipo B</p>
          <h1>Cartões que abrem ao passar.</h1>
          <p className="lede">O ícone se move ao passar o cursor. No toque, o cartão abre. A seção publicada continua igual.</p>
          <CardsPreview />
        </div>
      </section>
    </Layout>
  );
}
