import Layout from '../../../components/site/Layout';
import { WeavePreview } from '../../../components/site/ComoPreviews';

export default function PreviewC() {
  return (
    <Layout
      title="Trama | GTX"
      description="Protótipo de uma trama entre o método e as áreas da operação."
      noindex
      showCrumbs={false}
    >
      <section className="section proto">
        <div className="shell">
          <p className="eyebrow">Protótipo C</p>
          <h1>Uma trama entre etapa e área.</h1>
          <p className="lede">Cada cruzamento junta uma etapa do método a uma área da operação. A seção publicada continua igual.</p>
          <WeavePreview />
        </div>
      </section>
    </Layout>
  );
}
