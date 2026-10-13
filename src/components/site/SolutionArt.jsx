export function DeskArt() {
  return (
    <div className="sol-app" aria-hidden="true">
      <div className="sol-app-bar">
        <span className="sol-dots" aria-hidden="true"><i /><i /><i /></span>
        <span>Caixa de atendimento</span>
        <span className="sol-pill">WhatsApp</span>
      </div>
      <div className="sol-metrics">
        <div><small>Na fila</small><span className="sol-bar" /></div>
        <div><small>Pedidos lançados</small><span className="sol-bar mid" /></div>
        <div><small>Cobranças enviadas</small><span className="sol-bar short" /></div>
      </div>
      <div className="sol-split">
        <ul className="sol-list">
          <li className="is-on">
            <b>Pedido novo</b>
            <span>No WhatsApp</span>
          </li>
          <li>
            <b>Cobrança</b>
            <span>No canal atual</span>
          </li>
          <li>
            <b>Resumo do dia</b>
            <span>Para quem decide</span>
          </li>
        </ul>
        <div className="sol-thread">
          <p className="from-them">O pedido chegou no WhatsApp.</p>
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
        <em>WhatsApp</em>
      </div>
      <p className="from-them">O pedido chegou no WhatsApp.</p>
      <p className="from-ia">Lancei no sistema.</p>
      <p className="sol-sys">Pedido no sistema</p>
      <p className="from-them late">A cobrança sai neste chat?</p>
      <p className="from-ia later">A cobrança já saiu no WhatsApp.</p>
    </div>
  );
}

export function AdsArt() {
  return (
    <div className="sol-dash" aria-hidden="true">
      <div className="sol-chat-bar">
        <span>Painel de campanhas</span>
        <em>Sua conta</em>
      </div>
      <div className="sol-metrics">
        <div><small>ROAS</small><span className="sol-bar" /></div>
        <div><small>CPA</small><span className="sol-bar short" /></div>
      </div>
      <div className="sol-skel" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>
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
        <i className="sol-dot d1" />
      </div>
      <div className="sol-quad">
        <span>Depois</span>
        <i className="sol-dot d2" />
      </div>
      <div className="sol-quad">
        <span>Observar</span>
        <i className="sol-dot d3" />
      </div>
      <div className="sol-quad">
        <span>Não entra</span>
        <i className="sol-dot d4" />
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
