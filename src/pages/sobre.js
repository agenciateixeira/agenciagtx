import Layout from '../components/site/Layout';
import Link from 'next/link';

export default function Sobre() {
  return (
    <Layout
      title="Implantamos IA em empresas | GTX"
      description="GTX Gestão e Implementações Digitais, desde 2017, atendimento remoto no Brasil. A conversa comercial é com Guilherme Teixeira."
    >
      <article className="page">
        <section className="hero">
          <div className="shell">
            <p className="eyebrow">Sobre</p>
            <h1>Implantamos IA em empresas.</h1>
            <p className="lede">GTX Gestão e Implementações Digitais, desde 2017, atendimento remoto no Brasil.</p>
          </div>
        </section>
        <section>
          <div className="shell stack">
            <article>
              <h2>Guilherme Teixeira.</h2>
              <p>A conversa comercial é direta com ele. A biografia entra com o texto que ele escrever.</p>
            </article>
            <article>
              <h2>Três passos, e um deles é dizer não.</h2>
              <p>Diagnóstico, plano curto, e a primeira entrega no fluxo que já existe.</p>
            </article>
            <article>
              <h2>O que a GTX não faz.</h2>
              <p>Aplicativo do zero sem processo, e retorno prometido antes de ver a operação.</p>
            </article>
            <article>
              <h2>Produtos.</h2>
              <p>
                <Link href="/produtos/implantacao-de-ia">Implantação de IA</Link>
                {' · '}
                <Link href="/produtos/gestao-de-trafego-pago">Gestão de tráfego pago</Link>
              </p>
            </article>
          </div>
        </section>
      </article>
    </Layout>
  );
}
