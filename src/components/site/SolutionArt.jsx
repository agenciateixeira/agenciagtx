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
          <p className="from-ia">Pedido no sistema. A cobrança sai hoje.</p>
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
      <p className="from-ia">Pedido lançado no sistema.</p>
      <p className="sol-sys">Pedido no sistema</p>
      <p className="from-them late">A cobrança sai neste chat?</p>
      <p className="from-ia later">A cobrança já saiu no WhatsApp.</p>
    </div>
  );
}

export function AdsArt() {
  return (
    <div className="sol-ads" aria-hidden="true">
      <div className="sol-ads-bar">
        <span>Painel de campanhas</span>
        <em>Sua conta</em>
      </div>
      <p className="sol-ads-title">Leitura semanal</p>
      <ul>
        <li>Meta</li>
        <li>Google</li>
        <li>LinkedIn</li>
      </ul>
      <p className="sol-ads-foot">O que pausar, o que escalar e o que não repetir.</p>
    </div>
  );
}

export function SocialArt() {
  return (
    <div className="sol-ads" aria-hidden="true">
      <div className="sol-ads-bar">
        <span>Redes da empresa</span>
        <em>Presença</em>
      </div>
      <p className="sol-ads-title">No ritmo da operação</p>
      <ul>
        <li>O que publicar</li>
        <li>O que responder</li>
        <li>O que parar</li>
      </ul>
      <p className="sol-ads-foot">Sem pacote genérico e sem cifra de alcance.</p>
    </div>
  );
}

export function MatrixArt() {
  return (
    <div className="sol-impact" aria-hidden="true">
      <p className="sol-impact-kicker">Impacto</p>
      <ol>
        <li className="is-now">O que fazer agora</li>
        <li>O que fica para depois</li>
        <li className="is-out">O que não entra</li>
      </ol>
    </div>
  );
}

const arts = {
  ia: InboxArt,
  redes: SocialArt,
  trafego: AdsArt,
  diagnostico: MatrixArt,
};

export function SolutionPreview({ id }) {
  const Art = arts[id] || InboxArt;
  return <Art />;
}
