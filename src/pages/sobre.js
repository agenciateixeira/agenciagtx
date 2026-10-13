import Layout from '../components/site/Layout';
import Link from 'next/link';

export default function Sobre() {
  return (
    <Layout
      title="Implantamos IA em empresas | GTX"
      description="GTX Gestão e Implementações Digitais, desde 2017, atendimento remoto no Brasil. A conversa comercial é com Guilherme Teixeira."
    >
      <article>
        <section className="hero">
          <div className="shell">
            <p className="eyebrow">Quem somos</p>
            <h1>Implantamos IA em empresas.</h1>
            <p className="lede">GTX Gestão e Implementações Digitais, desde 2017, atendimento remoto no Brasil.</p>
          </div>
        </section>

        <section className="founder" aria-label="Guilherme Teixeira">
          <div className="shell founder-grid">
            <img
              className="founder-photo"
              src="/images/guilherme-teixeira.jpg"
              alt="Guilherme Teixeira"
              width="720"
              height="1080"
            />
            <div>
              <p className="eyebrow">Fundador</p>
              <h2>Guilherme Teixeira.</h2>
              <p className="role">Fundador da Agência GTX. 9 anos em growth marketing.</p>
              <p>Sem transparência e sem visão do conjunto, o dado não sustenta a decisão. A implantação de IA entra no fluxo que a empresa já tem.</p>
              <p className="hero-actions"><Link className="btn" href="/contato">Pedir diagnóstico</Link></p>
            </div>
          </div>
        </section>

        <section>
          <div className="shell split">
            <article>
              <h2>Três passos, e um deles é dizer não.</h2>
              <p>Diagnóstico, plano curto, e a primeira entrega no fluxo que já existe.</p>
            </article>
            <article>
              <h2>O que a GTX não faz.</h2>
              <p>Aplicativo do zero sem processo, e retorno prometido antes de ver a operação.</p>
            </article>
          </div>
        </section>

        <section className="section flush-top">
          <div className="shell">
            <p className="eyebrow">Produtos</p>
            <div className="quiet-links">
              <Link href="/produtos/implantacao-de-ia">Implantação de IA</Link>
              <Link href="/produtos/gestao-de-trafego-pago">Gestão de tráfego pago</Link>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
