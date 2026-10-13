import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { solutions } from '../../lib/solutions';
import { AdsArt, DeskArt, InboxArt, MatrixArt } from './SolutionArt';

const arts = {
  ia: InboxArt,
  trafego: AdsArt,
  diagnostico: MatrixArt,
};

function RiskIcon({ children }) {
  return (
    <svg className="risk-icon" viewBox="0 0 72 64" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

const risks = [
  {
    step: 'Diagnóstico',
    title: 'Automatizar o fluxo errado',
    problem: 'O tempo vai para uma automação que não tira cópia, cobrança ou lembrete. Ou para anúncio antes de ver a conta.',
    answer: 'O diagnóstico dura 30 minutos, sem contrato. Se a implantação não cabe, ou se o tráfego não cabe agora, a conversa acaba ali. Não há proposta de retorno antes de ver a operação.',
    icon: (
      <RiskIcon>
        <path d="M36 10 L58 22 L36 34 L14 22 Z" />
        <path d="M14 22 L14 40 L36 52 L36 34" />
        <path d="M58 22 L58 40 L36 52" />
        <path className="lift" d="M58 22 L68 16" />
        <path className="lift" d="M65 14 L68 16 L65 19" />
      </RiskIcon>
    ),
  },
  {
    step: 'Plano',
    title: 'Crescer em cima de uma automação frágil',
    problem: 'O fluxo entra no ar, mas o próximo passo não foi escolhido. Quando o volume sobe, o que era atalho vira trava.',
    answer: 'O plano diz o que fazer agora, o que fica para depois e o que não entra. A próxima automação só começa quando a primeira já faz parte do dia. O prazo fica no plano, porque depende do fluxo.',
    icon: (
      <RiskIcon>
        <path d="M36 28 L58 40 L36 52 L14 40 Z" />
        <path d="M14 40 L14 50 L36 62 L36 52" />
        <path d="M58 40 L58 50 L36 62" />
        <g className="lift">
          <path d="M36 8 L58 20 L36 32 L14 20 Z" />
          <path d="M14 20 L14 28 L36 40 L36 32" />
          <path d="M58 20 L58 28 L36 40" />
        </g>
      </RiskIcon>
    ),
  },
  {
    step: 'Acompanhamento',
    title: 'Ficar preso à ferramenta ou a quem implantou',
    problem: 'A operação passa a depender de um aplicativo novo. Ou a conta de anúncio sai de quem é dono dela.',
    answer: 'A GTX implementa IAs no WhatsApp, no CRM, no ERP ou na planilha que a empresa já usa. A GTX não troca esse sistema por um aplicativo novo. A conta de anúncio continua com o cliente. Todo mês, enquanto o plano estiver ativo, o acompanhamento desliga o que ninguém usa.',
    icon: (
      <RiskIcon>
        <path d="M28 18 L48 28 L28 38 L8 28 Z" />
        <path d="M8 28 L8 44 L28 54 L28 38" />
        <path d="M48 28 L48 44 L28 54" />
        <g className="lift">
          <path d="M46 14 a8 8 0 0 1 14 6" />
          <path d="M46 20 L46 30 L60 30 L60 20" />
        </g>
      </RiskIcon>
    ),
  },
];

const rows = [
  {
    topic: 'O pedido',
    heavy: 'Alguém copia da conversa para o sistema.',
    light: 'O pedido entra no sistema que a empresa já usa.',
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
            <p className="lede">IAs implementadas dentro da empresa, gestão de tráfego pago e um diagnóstico de 30 minutos.</p>
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
            <p className="lede">O mesmo pedido, a mesma cobrança, o mesmo resumo. A implantação otimiza o processo que já existe.</p>
          </div>
          <div className="compare-wrap">
            <table className="compare">
              <caption>Como o trabalho repetido fica quando a implantação entra no processo que a empresa já tem.</caption>
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

      <section className="section risks" aria-labelledby="riscos-titulo">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Riscos</p>
            <h2 id="riscos-titulo">Existem três jeitos de uma implantação de IA dar errado.</h2>
            <p className="lede">Diagnóstico, plano e acompanhamento. Cada etapa tira um desses jeitos do caminho. Vale para a implantação de IA e para a gestão de tráfego pago.</p>
          </div>
          <div className="risk-grid">
            {risks.map((item) => (
              <article key={item.step}>
                <p className="risk-kicker">{item.step}</p>
                {item.icon}
                <h3>{item.title}</h3>
                <p className="risk-problem">{item.problem}</p>
                <p className="risk-fix">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
