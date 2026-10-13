export default function Steps({ items, label }) {
  return (
    <ol className="editorial" aria-label={label}>
      {items.map((item) => (
        <li key={item.n}>
          <span>{item.n}</span>
          <div>
            <p className="label">{item.label}</p>
            <p className="line">{item.line}</p>
            {item.text ? <p className="extra">{item.text}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
