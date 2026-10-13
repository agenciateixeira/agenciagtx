export default function Faq({ title, items, id = 'perguntas' }) {
  return (
    <section className="section" id={id} aria-label={title}>
      <div className="shell">
        <div className="section-intro">
          <p className="eyebrow">Perguntas</p>
          <h2>{title}</h2>
        </div>
        <dl className="faq">
          {items.map((item) => (
            <div key={item.q}>
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
