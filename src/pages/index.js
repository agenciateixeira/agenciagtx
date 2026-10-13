import Layout from '../components/site/Layout';
import LeadForm from '../components/site/LeadForm';
import FlowMap from '../components/site/FlowMap';

const clients = [
  { src: '/images/clients/logofl.png', alt: 'Frasco Life' },
  { src: '/images/clients/LOGODZS.png', alt: 'Depósito Zona Sul' },
  { src: '/images/clients/logosneakers.png', alt: 'Sneaker Society' },
  { src: '/images/clients/logojsete.png', alt: 'Jsete' },
  { src: '/images/clients/logoroute.png', alt: 'Route Cred' },
  { src: '/images/clients/logoflypro.png', alt: 'FlyPro' },
  { src: '/images/clients/podologia.png', alt: 'Podologia' },
];

export default function Home() {
  return (
    <Layout
      title="IA na operação da sua empresa | GTX"
      description="A GTX implementa inteligência artificial no trabalho repetido da empresa. Diagnóstico de 30 minutos, sem contrato."
    >
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">Agência GTX</p>
          <div className="hero-row">
            <h1>IA na operação da sua empresa.</h1>
            <a className="btn" href="#contato">Pedir diagnóstico</a>
          </div>
          <p className="lede">No trabalho que hoje alguém copia, cobra ou lembra.</p>
        </div>
      </section>

      <section aria-label="O que fazemos, como e por quê">
        <div className="shell">
          <ol className="three">
            <li>
              <span>O quê</span>
              <p>IA no processo repetido. Pedido, cobrança, resumo do dia.</p>
            </li>
            <li>
              <span>Como</span>
              <p>Diagnóstico de 30 minutos, um plano curto e a primeira automação no canal atual.</p>
            </li>
            <li>
              <span>Por quê</span>
              <p>O time para de copiar e lembrar. Quem decide continua decidindo.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="flow-section" aria-label="IA no fluxo que a empresa já tem">
        <div className="shell">
          <p className="eyebrow">O fluxo</p>
          <h2>IA no fluxo que a empresa já tem.</h2>
          <p className="lede">Pedido, cobrança e resumo do dia, no canal que o time já usa.</p>
          <FlowMap />
        </div>
      </section>

      <section className="proof" aria-label="Clientes">
        <div className="shell">
          <p className="eyebrow">Quem já passou pela GTX</p>
        </div>
        <div className="marquee">
          <ul className="marquee-track">
            {clients.map((client) => (
              <li key={client.src}><img src={client.src} alt={client.alt} /></li>
            ))}
            {clients.map((client) => (
              <li key={`${client.src}-copia`} aria-hidden="true"><img src={client.src} alt="" /></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact" id="contato">
        <div className="shell contact-grid">
          <div>
            <p className="eyebrow">Diagnóstico</p>
            <h2>Diga onde a operação pesa.</h2>
            <p className="lede">30 minutos, sem contrato. Ou fale direto no <a href="https://wa.me/5519990122773?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20GTX%20e%20quero%20um%20diagn%C3%B3stico.">WhatsApp</a>.</p>
          </div>
          <LeadForm page="/" messageLabel="Onde a operação pesa" />
        </div>
      </section>
    </Layout>
  );
}
