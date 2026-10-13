import Link from 'next/link';
import Layout from '../components/site/Layout';

export default function NotFound() {
  return (
    <Layout title="Página não encontrada | GTX" description="Esta página não existe." noindex>
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">404</p>
          <h1>Página não encontrada.</h1>
          <p className="lede">O endereço não existe. Volte ao início ou peça um diagnóstico.</p>
          <p className="hero-actions actions">
            <Link className="btn" href="/">Início</Link>
            <Link className="btn ghost" href="/contato">Contato</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
