import Link from 'next/link';
import Layout from '../../components/site/Layout';

export default function SneakerSociety() {
  return (
    <Layout
      title="Sneaker Society | GTX"
      description="De R$ 19 mil para mais de R$ 60 mil por mês, com o mesmo custo de anúncio. Relato de Leonardo Utida."
    >
      <article className="page">
        <section className="hero">
          <div className="shell">
            <p className="eyebrow">Cases · Tráfego pago</p>
            <h1>De R$ 19 mil para mais de R$ 60 mil por mês.</h1>
            <p className="lede">Gestão de tráfego pago. Mesmo custo de anúncio. Relato de Leonardo Utida.</p>
            <p className="note">O período entra depois de conferir a conta.</p>
          </div>
        </section>
        <section>
          <div className="shell stack">
            <article>
              <h2>O que estava acontecendo.</h2>
              <p>Loja online com a mesma verba e faturamento em cerca de R$ 19 mil por mês.</p>
            </article>
            <article>
              <h2>O que a GTX fez.</h2>
              <p>Gestão do tráfego pago em cima da verba que já existia.</p>
            </article>
            <article>
              <h2>Ver se o seu caso se parece.</h2>
              <p>Uma conversa de 30 minutos, sem contrato.</p>
              <p><Link className="btn" href="/contato">Pedir diagnóstico</Link></p>
            </article>
          </div>
        </section>
      </article>
    </Layout>
  );
}
