import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { solutions } from '../../lib/solutions';
import { AdsArt, DeskArt, InboxArt, MatrixArt } from './SolutionArt';

const arts = {
  ia: InboxArt,
  trafego: AdsArt,
  diagnostico: MatrixArt,
};

const rows = [
  {
    topic: 'O pedido',
    heavy: 'Alguém copia da conversa para o sistema.',
    light: 'A IA lança no sistema que a empresa já usa.',
  },
  {
    topic: 'A cobrança',
    heavy: 'Sai quando alguém lembra.',
    light: 'Sai no dia, no canal atual.',
  },
  {
    topic: 'O resumo',
    heavy: 'É montado na mão.',
    light: 'Chega pronto para quem decide.',
  },
  {
    topic: 'O time',
    heavy: 'Mais fluxo pede mais gente para copiar.',
    light: 'A mesma equipe acompanha mais pedidos.',
  },
  {
    topic: 'A decisão',
    heavy: 'Fica misturada com o trabalho repetido.',
    light: 'Fica com quem já decide.',
  },
];

export default function Solutions() {
  const stage = useRef(null);

  useEffect(() => {
    const node = stage.current;
    if (!node) return undefined;
    const app = node.querySelector('.sol-app');
    if (!app) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return undefined;

    const move = (event) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      app.style.transform = `rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
    };
    const leave = () => {
      app.style.transform = '';
    };
    node.addEventListener('mousemove', move);
    node.addEventListener('mouseleave', leave);
    return () => {
      node.removeEventListener('mousemove', move);
      node.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <>
      <section className="section solutions" aria-labelledby="solucoes-titulo">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Soluções</p>
            <h2 id="solucoes-titulo">Nossas soluções.</h2>
            <p className="lede">Implantação de IA, gestão de tráfego pago e um diagnóstico de 30 minutos.</p>
          </div>

          <div className="sol-stage sol-hero-stage" ref={stage}>
            <DeskArt />
          </div>

          <div className="sol-grid">
            {solutions.map((item) => {
              const Art = arts[item.id];
              return (
                <article className="sol-card" key={item.id}>
                  <div className="sol-stage sol-card-stage">
                    <Art />
                  </div>
                  <div className="sol-card-body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <Link className="text-link" href={item.href}>{item.link}</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section solutions-compare" aria-labelledby="compare-titulo">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Comparação</p>
            <h2 id="compare-titulo">Operação pesada, operação leve.</h2>
            <p className="lede">O mesmo pedido, a mesma cobrança, o mesmo resumo. Muda quem faz o trabalho repetido.</p>
          </div>
          <div className="compare-wrap">
            <table className="compare">
              <caption>Como o trabalho repetido fica com e sem a IA no fluxo atual.</caption>
              <thead>
                <tr>
                  <th scope="col">Tema</th>
                  <th scope="col">Operação pesada</th>
                  <th scope="col">Operação leve</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.topic}>
                    <th scope="row">{row.topic}</th>
                    <td data-label="Operação pesada">{row.heavy}</td>
                    <td data-label="Operação leve">{row.light}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
