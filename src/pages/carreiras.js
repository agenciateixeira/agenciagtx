import Layout from '../components/site/Layout';
import LeadForm from '../components/site/LeadForm';

export default function Carreiras() {
  return (
    <Layout
      title="Trabalhe na GTX | GTX"
      description="Vagas remotas na GTX. Conte sua experiência. Sem anexo."
      crumbs={[{ href: '/', label: 'Início' }, { href: '/carreiras', label: 'Carreiras' }]}
    >
      <section className="hero roomy">
        <div className="shell">
          <p className="eyebrow">Carreiras</p>
          <h1>Trabalhe na GTX.</h1>
          <p className="lede">Vagas remotas. Conte sua experiência neste formulário. Sem anexo.</p>
        </div>
      </section>
      <section className="contact">
        <div className="shell contact-grid">
          <div>
            <h2>Envie seu contato.</h2>
            <p className="lede">Nome, email, WhatsApp, empresa atual e um parágrafo sobre o que você faz.</p>
          </div>
          <LeadForm
            page="/carreiras"
            interesse="Carreiras"
            showInteresse={false}
            messageLabel="Experiência"
            submitLabel="Enviar"
          />
        </div>
      </section>
    </Layout>
  );
}
