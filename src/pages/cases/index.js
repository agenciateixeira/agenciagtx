import Link from 'next/link';
import Layout from '../../components/site/Layout';

const cases = [
  {
    href: '/cases/sneaker-society',
    title: 'Sneaker Society.',
    text: 'Tráfego pago. De R$ 19 mil para mais de R$ 60 mil por mês, com o mesmo anúncio.',
  },
  {
    href: '/contato',
    title: 'Frasco Life.',
    text: 'A operação industrial, nos canais digitais.',
  },
  {
    href: '/contato',
    title: 'Jsete.',
    text: 'Da loja física para a loja online.',
  },
];

export default function Cases() {
  return (
    <Layout
      title="Trabalho com nome | GTX"
      description="Cases da GTX com nome de quem assina. Um número só quando a conta foi conferida."
      crumbs={[{ href: '/', label: 'Início' }, { href: '/cases', label: 'Cases' }]}
    >
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">Cases</p>
          <h1>Trabalho com nome.</h1>
          <p className="lede">Um número só quando a conta foi conferida.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell case-list">
          {cases.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2><Link href={item.href}>{item.title}</Link></h2>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
