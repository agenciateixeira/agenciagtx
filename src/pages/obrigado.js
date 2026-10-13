import Link from 'next/link';
import Layout from '../components/site/Layout';

export default function Obrigado() {
  return (
    <Layout
      title="Recebemos | GTX"
      description="O retorno chega em horário comercial, no WhatsApp que você deixou."
      noindex
    >
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">Contato</p>
          <h1>Recebemos.</h1>
          <p className="lede">O retorno chega em horário comercial, no WhatsApp que você deixou.</p>
          <p style={{ marginTop: '1.5rem' }}><Link className="btn" href="/">Voltar ao início</Link></p>
        </div>
      </section>
    </Layout>
  );
}
