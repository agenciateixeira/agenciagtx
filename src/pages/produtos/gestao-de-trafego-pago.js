import Link from 'next/link';
import Layout from '../../components/site/Layout';
import LeadForm from '../../components/site/LeadForm';

export default function TrafegoPago() {
  return (
    <Layout
      title="Gestão de tráfego pago | GTX"
      description="Gestão de anúncio no Meta, no Google e no LinkedIn, com um número por semana. Sem proposta de retorno antes de olhar a conta."
    >
      <article className="page">
        <section className="hero">
          <div className="shell">
            <p className="eyebrow">Produtos</p>
            <h1>Gestão de tráfego pago.</h1>
            <p className="lede">Meta, Google e LinkedIn, com um número por semana.</p>
          </div>
        </section>
        <section>
          <div className="shell">
            <ol className="cards">
              <li>
                <h3>Meta</h3>
                <p>Quem já conhece a marca e quem ainda não comprou.</p>
              </li>
              <li>
                <h3>Google</h3>
                <p>Quem está procurando agora.</p>
              </li>
              <li>
                <h3>LinkedIn</h3>
                <p>Quem decide na empresa, quando a venda é entre empresas.</p>
              </li>
            </ol>
            <div className="stack">
              <article>
                <h2>O que você lê toda semana.</h2>
                <p>O que pausar, o que escalar e o que não repetir.</p>
              </article>
              <article>
                <h2>O que não está incluso.</h2>
                <p>Loja virtual, marketplace e pacote de posts sem anúncio.</p>
              </article>
              <article>
                <h2>Sneaker Society.</h2>
                <p>De R$ 19 mil para mais de R$ 60 mil por mês, com o mesmo anúncio. Leonardo Utida.</p>
                <p className="note">Relato do cliente. O período entra depois de conferir a conta.</p>
                <p className="more"><Link className="text-link" href="/cases/sneaker-society">Ler o case</Link></p>
              </article>
            </div>
          </div>
        </section>
      </article>
      <section className="contact" id="contato">
        <div className="shell contact-grid">
          <div>
            <p className="eyebrow">Diagnóstico</p>
            <h2>Ver se o tráfego cabe agora.</h2>
            <p className="lede">Sem proposta de retorno antes de olhar a conta.</p>
          </div>
          <LeadForm
            page="/produtos/gestao-de-trafego-pago"
            interesse="Gestão de tráfego pago"
            showInteresse={false}
            messageLabel="Como o anúncio funciona hoje"
          />
        </div>
      </section>
    </Layout>
  );
}
