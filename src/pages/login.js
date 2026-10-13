import Layout from '../components/site/Layout';

const loginUrl = 'https://app.agenciagtx.com.br';
const whatsappLink = `https://wa.me/5519990122773?text=${encodeURIComponent('Olá! Preciso de ajuda para acessar minha conta.')}`;

const points = [
  { title: 'Segurança e transparência', text: 'Acesso protegido e informações sempre atualizadas para o seu time.' },
  { title: 'Autenticação simples', text: 'Use seu email corporativo e a senha cadastrada para entrar.' },
  { title: 'Suporte dedicado', text: 'Especialistas disponíveis para ajudar com qualquer dúvida no acesso.' },
];

export default function LoginPage() {
  return (
    <Layout title="Área do cliente | GTX" description="Acesse o painel da GTX." noindex>
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">Área restrita</p>
          <h1>Bem vindo ao portal do cliente.</h1>
          <p className="lede">Aqui você acompanha relatórios e o andamento do trabalho, em um ambiente seguro.</p>
          <p className="hero-actions">
            <a className="btn" href={loginUrl} target="_blank" rel="noopener noreferrer">Ir para o app</a>
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <ol className="cards">
            {points.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
          <p className="lede"><a href={whatsappLink}>Fale com o atendimento no WhatsApp</a></p>
        </div>
      </section>
    </Layout>
  );
}
