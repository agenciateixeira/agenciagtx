import Layout from '../components/site/Layout';
import LeadForm from '../components/site/LeadForm';

export default function Contato() {
  return (
    <Layout
      title="Diga onde a operação pesa | GTX"
      description="Diagnóstico de 30 minutos, sem contrato. Resposta em horário comercial."
    >
      <section className="contact" id="contato">
        <div className="shell contact-grid">
          <div>
            <p className="eyebrow">Contato</p>
            <h1>Diga onde a operação pesa.</h1>
            <p className="lede">30 minutos, sem contrato. Resposta em horário comercial.</p>
            <p>
              <a href="https://wa.me/5519990122773?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20GTX%20e%20quero%20um%20diagn%C3%B3stico.">WhatsApp +55 19 99012 2773</a>
              <br />
              contato@agenciagtx.com.br
            </p>
          </div>
          <LeadForm page="/contato" />
        </div>
      </section>
    </Layout>
  );
}
