import { useEffect, useRef, useState } from 'react';

export const outcomes = [
  {
    id: 'pedido',
    name: 'Pedido',
    before: 'Alguém copia da conversa para o sistema.',
    after: 'O pedido entra no sistema que a empresa já usa.',
  },
  {
    id: 'cobranca',
    name: 'Cobrança',
    before: 'Sai quando alguém lembra.',
    after: 'A cobrança sai no dia, no canal atual.',
  },
  {
    id: 'resumo',
    name: 'Resumo do dia',
    before: 'É montado na mão.',
    after: 'O resumo chega pronto para quem decide.',
  },
];

function Board({ step, onPick }) {
  const item = outcomes[step];
  return (
    <div className="outcome-board">
      <div className="outcome-nav" role="tablist" aria-label="Resultado">
        {outcomes.map((entry, index) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={index === step}
            className={index === step ? 'is-on' : undefined}
            onClick={() => onPick(index)}
          >
            {entry.name}
          </button>
        ))}
      </div>
      <article key={item.id} className="outcome-stage">
        <p className="outcome-before">
          <span>O que pesava</span>
          <s>{item.before}</s>
        </p>
        <h3>{item.after}</h3>
      </article>
    </div>
  );
}

export function OutcomePin() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 879px)');
    if (reduce.matches || narrow.matches) return undefined;
    const node = ref.current;
    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const total = node.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      setStep(Math.min(outcomes.length - 1, Math.floor(progress * outcomes.length)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pick = (index) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrow = window.matchMedia('(max-width: 879px)').matches;
    setStep(index);
    if (reduce || narrow || !ref.current) return;
    const node = ref.current;
    const total = node.offsetHeight - window.innerHeight;
    const top = window.scrollY + node.getBoundingClientRect().top + (total * (index + 0.12)) / outcomes.length;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="story" ref={ref}>
      <div className="story-pin">
        <Board step={step} onPick={pick} />
      </div>
    </div>
  );
}

export default function FlowMap() {
  const [step, setStep] = useState(0);
  return <Board step={step} onPick={setStep} />;
}
