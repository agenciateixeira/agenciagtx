export function DeskArt() {
  return (
    <div className="sol-app" aria-hidden="true">
      <div className="sol-app-bar">
        <span className="sol-dots" aria-hidden="true"><i /><i /><i /></span>
        <span>Caixa de atendimento</span>
        <span className="sol-pill">Exemplo</span>
      </div>
      <div className="sol-metrics">
        <div><small>Na fila</small><strong>6</strong></div>
        <div><small>Pedidos lançados</small><strong>14</strong></div>
        <div><small>Cobranças enviadas</small><strong>3</strong></div>
      </div>
      <div className="sol-split">
        <ul className="sol-list">
          <li className="is-on">
            <b>Pedido novo</b>
            <span>12 unidades no WhatsApp</span>
          </li>
          <li>
            <b>Cobrança</b>
            <span>Boleto do dia</span>
          </li>
          <li>
            <b>Resumo do dia</b>
            <span>O que travou</span>
          </li>
        </ul>
        <div className="sol-thread">
          <p className="from-them">O pedido de 12 unidades chegou no WhatsApp.</p>
          <p className="from-ia">Lancei no sistema. A cobrança sai hoje.</p>
          <p className="from-ia is-typing"><span /><span /><span /></p>
        </div>
      </div>
    </div>
  );
}

export function InboxArt() {
  return (
    <div className="sol-chat" aria-hidden="true">
      <div className="sol-chat-bar">
        <span>Atendimento</span>
        <em>Exemplo</em>
      </div>
      <p className="from-them">Tem o produto azul em estoque?</p>
      <p className="from-ia">Sim. Separei 4 unidades e lancei o pedido.</p>
      <p className="sol-sys">Pedido no sistema</p>
      <p className="from-them late">Pode cobrar neste chat?</p>
      <p className="from-ia later">A cobrança já saiu no WhatsApp.</p>
    </div>
  );
}

export function AdsArt() {
  return (
    <div className="sol-dash" aria-hidden="true">
      <div className="sol-chat-bar">
        <span>Painel de campanhas</span>
        <em>Exemplo</em>
      </div>
      <div className="sol-metrics">
        <div><small>ROAS</small><strong>3,4</strong></div>
        <div><small>CPA</small><strong>R$ 42</strong></div>
      </div>
      <svg className="sol-chart" viewBox="0 0 280 88">
        <path className="sol-chart-fill" d="M8 70 C 48 66, 62 40, 96 44 S 150 22, 188 28 S 236 16, 272 18 L 272 80 L 8 80 Z" />
        <path className="sol-chart-line" d="M8 70 C 48 66, 62 40, 96 44 S 150 22, 188 28 S 236 16, 272 18" />
      </svg>
      <div className="sol-channels">
        <span>Meta</span>
        <span>Google</span>
        <span>LinkedIn</span>
      </div>
    </div>
  );
}

export function MatrixArt() {
  return (
    <div className="sol-matrix" aria-hidden="true">
      <span className="sol-axis y">Impacto</span>
      <div className="sol-quad">
        <span>Agora</span>
        <i className="sol-dot d1">1</i>
      </div>
      <div className="sol-quad">
        <span>Depois</span>
        <i className="sol-dot d2">2</i>
      </div>
      <div className="sol-quad">
        <span>Observar</span>
        <i className="sol-dot d3">3</i>
      </div>
      <div className="sol-quad">
        <span>Não entra</span>
        <i className="sol-dot d4">4</i>
      </div>
      <span className="sol-axis x">Esforço</span>
    </div>
  );
}

const arts = {
  ia: InboxArt,
  trafego: AdsArt,
  diagnostico: MatrixArt,
};

export function SolutionPreview({ id }) {
  const Art = arts[id] || InboxArt;
  return <Art />;
}
