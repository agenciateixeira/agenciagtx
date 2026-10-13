import { useEffect, useRef } from 'react';

const moments = [
  {
    title: 'Diagnóstico',
    line: 'Ver os processos que a empresa já tem.',
  },
  {
    title: 'Desenho da IA',
    line: 'A IA fica dentro do processo que já existe.',
  },
  {
    title: 'Implantação',
    line: 'Integra com o WhatsApp, o CRM, o ERP ou a planilha.',
  },
  {
    title: 'Adoção do time',
    line: 'Passa a fazer parte do trabalho do dia.',
  },
  {
    title: 'Acompanhamento',
    line: 'Acompanha e ajusta o que ficou no ar.',
  },
];

export default function ImplantFlow() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      node.classList.add('is-drawn');
      return undefined;
    }
    let frame = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      frame = requestAnimationFrame(() => node.classList.add('is-drawn'));
      io.disconnect();
    }, { threshold: 0.22, rootMargin: '0px 0px -6% 0px' });
    io.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  return (
    <figure className="implant-flow" ref={ref} aria-labelledby="fluxo-implante">
      <figcaption id="fluxo-implante">No processo que já existe</figcaption>
      <div className="implant-track">
        <svg className="implant-wave is-y" viewBox="0 0 64 640" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path className="implant-wash" d="M0 0 H30 C46 78 12 128 34 198 S8 318 36 398 S10 518 32 600 L0 640 Z" />
          <path className="implant-line" pathLength="1" d="M30 0 C46 78 12 128 34 198 S8 318 36 398 S10 518 32 600" />
        </svg>
        <svg className="implant-wave is-x" viewBox="0 0 1000 86" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path className="implant-wash" d="M0 34 C90 34 130 12 220 14 S360 64 480 38 S640 10 760 22 S900 66 1000 32 V86 H0 Z" />
          <path className="implant-line" pathLength="1" d="M0 34 C90 34 130 12 220 14 S360 64 480 38 S640 10 760 22 S900 66 1000 32" />
        </svg>
        <ol>
          {moments.map((moment) => (
            <li key={moment.title}>
              <strong>{moment.title}</strong>
              <span>{moment.line}</span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
