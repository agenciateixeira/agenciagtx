export default function Steps({ items, label, numbered = false }) {
  return (
    <ol className={numbered ? 'editorial' : 'editorial plain'} aria-label={label}>
      {items.map((item) => (
        <li key={item.label}>
          {numbered ? <span>{item.n}</span> : null}
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
