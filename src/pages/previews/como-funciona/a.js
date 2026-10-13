import Layout from '../../../components/site/Layout';
import { PathPreview } from '../../../components/site/ComoPreviews';

export default function PreviewA() {
  return (
    <Layout
      title="Caminho | GTX"
      description="Protótipo de um caminho para o diagnóstico, o plano e o acompanhamento."
      noindex
      showCrumbs={false}
    >
      <section className="section proto">
        <div className="shell">
          <p className="eyebrow">Protótipo A</p>
          <h1>Um caminho para percorrer.</h1>
          <p className="lede">A etapa e a área ficam na mesma leitura. Você escolhe as duas. A seção publicada continua igual.</p>
          <PathPreview />
        </div>
      </section>
    </Layout>
  );
}
