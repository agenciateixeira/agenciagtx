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
    >
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">Cases</p>
          <h1>Trabalho com nome.</h1>
          <p className="lede">Um número só quando a conta foi conferida.</p>
        </div>
      </section>
      <section className="page">
        <div className="shell stack">
          {cases.map((item) => (
            <article key={item.title}>
              <h2><Link href={item.href}>{item.title}</Link></h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
