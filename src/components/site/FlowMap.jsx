const outcomes = [
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

export default function FlowMap() {
  return (
    <div className="outcomes">
      {outcomes.map((item) => (
        <article key={item.id}>
          <p className="outcome-before">
            <span>O que pesava</span>
            <s>{item.before}</s>
          </p>
          <div className="outcome-now">
            <p>{item.name}</p>
            <h3>{item.after}</h3>
          </div>
        </article>
      ))}
    </div>
  );
}
