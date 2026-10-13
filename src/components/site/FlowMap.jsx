import { useId } from 'react';

const nodes = [
  { id: 'whatsapp', title: 'WhatsApp', text: 'O pedido chega', x: 13, y: 30, icon: 'chat' },
  { id: 'ia', title: 'IA', text: 'Lê e organiza', x: 37, y: 30, icon: 'spark', accent: true },
  { id: 'pedido', title: 'Pedido', text: 'Sem retrabalho', x: 63, y: 30, icon: 'box' },
  { id: 'sistema', title: 'Sistema', text: 'Onde a operação vive', x: 87, y: 30, icon: 'db' },
  { id: 'cobranca', title: 'Cobrança', text: 'O lembrete sai', x: 37, y: 74, icon: 'bill' },
  { id: 'resumo', title: 'Resumo do dia', text: 'Para quem decide', x: 66, y: 74, icon: 'day' },
];

const badges = [
  { id: 'chega', label: 'chega', x: 25, y: 30 },
  { id: 'organiza', label: 'organiza', x: 50, y: 30 },
  { id: 'entra', label: 'entra', x: 75, y: 30 },
  { id: 'lembra', label: 'lembra', x: 37, y: 52 },
  { id: 'fecha', label: 'fecha o dia', x: 51.5, y: 74 },
];

function Icon({ name }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  if (name === 'chat') {
    return (
      <svg {...common}>
        <path d="M3 3.5h8.5a1 1 0 0 1 1 1V9a1 1 0 0 1-1 1H6.2L3.5 12.2V4.5a1 1 0 0 1 1-1Z" />
      </svg>
    );
  }
  if (name === 'spark') {
    return (
      <svg {...common}>
        <path d="M8 1.8v3.2M8 11v3.2M1.8 8h3.2M11 8h3.2M3.6 3.6l2 2M10.4 10.4l2 2M12.4 3.6l-2 2M5.6 10.4l-2 2" />
        <circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === 'box') {
    return (
      <svg {...common}>
        <path d="M2.5 5.2 8 2.8l5.5 2.4V11L8 13.4 2.5 11V5.2Z" />
        <path d="M2.6 5.3 8 7.6l5.4-2.3M8 7.6V13.2" />
      </svg>
    );
  }
  if (name === 'db') {
    return (
      <svg {...common}>
        <ellipse cx="8" cy="4.2" rx="4.6" ry="1.7" />
        <path d="M3.4 4.2v7.4c0 1 2.1 1.8 4.6 1.8s4.6-.8 4.6-1.8V4.2" />
        <path d="M3.4 8c0 1 2.1 1.8 4.6 1.8s4.6-.8 4.6-1.8" />
      </svg>
    );
  }
  if (name === 'bill') {
    return (
      <svg {...common}>
        <path d="M4 2.5h8v11l-1.4-.8L9.2 13.5 8 12.6 6.8 13.5 5.4 12.7 4 13.5v-11Z" />
        <path d="M6 6h4M6 8.5h4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="8" cy="8" r="3.2" />
      <path d="M8 2.2v1.3M8 12.5v1.3M2.2 8h1.3M12.5 8h1.3" />
    </svg>
  );
}

function NodeCard({ node }) {
  return (
    <article className={`flow-node${node.accent ? ' accent' : ''}`}>
      <span className="flow-ico"><Icon name={node.icon} /></span>
      <span>
        <strong>{node.title}</strong>
        <small>{node.text}</small>
      </span>
    </article>
  );
}

export default function FlowMap() {
  const rawId = useId().replace(/:/g, '');
  const pid = (name) => `${rawId}-${name}`;

  const paths = [
    { name: 'a', d: 'M208 174 H292', dur: '2.6s', begin: '0s' },
    { name: 'b', d: 'M448 174 H552', dur: '2.8s', begin: '0.4s' },
    { name: 'c', d: 'M708 174 H812', dur: '2.4s', begin: '0.8s' },
    { name: 'd', d: 'M370 212 V416', dur: '2.2s', begin: '0.2s' },
    { name: 'e', d: 'M448 453 H572', dur: '2.7s', begin: '1s' },
  ];

  return (
    <div className="flow">
      <div className="flow-desk" aria-hidden="false">
        <div className="flow-board">
          <svg className="flow-lines" viewBox="0 0 1000 620" aria-hidden="true">
            {paths.map((path) => (
              <path key={path.name} id={pid(path.name)} d={path.d} />
            ))}
            {paths.map((path) => (
              <circle key={`${path.name}-pulse`} className="flow-pulse" r="3.4">
                <animateMotion dur={path.dur} begin={path.begin} repeatCount="indefinite" calcMode="linear">
                  <mpath href={`#${pid(path.name)}`} />
                </animateMotion>
              </circle>
            ))}
          </svg>
          <span className="flow-chip" style={{ left: '13%', top: '12%' }}>Entrada</span>
          {nodes.map((node) => (
            <div key={node.id} className="flow-slot" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
              <NodeCard node={node} />
            </div>
          ))}
          {badges.map((badge) => (
            <span key={badge.id} className="flow-badge" style={{ left: `${badge.x}%`, top: `${badge.y}%` }}>
              {badge.label}
            </span>
          ))}
          <p className="flow-note" style={{ left: '13%', top: '74%' }}>
            Sem montar a lista.
            <i />
          </p>
        </div>
      </div>

      <ol className="flow-stack">
        {nodes.map((node, index) => (
          <li key={node.id} className={index > 3 ? 'branch' : ''}>
            <span className="flow-rail" aria-hidden="true" />
            <NodeCard node={node} />
          </li>
        ))}
      </ol>
    </div>
  );
}
