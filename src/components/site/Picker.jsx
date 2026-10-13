import { useState } from 'react';

export default function Picker({ items, label }) {
  const [index, setIndex] = useState(0);
  const item = items[index];
  const base = label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '');

  return (
    <div className="picker">
      <div className="picker-tabs" role="tablist" aria-label={label}>
        {items.map((entry, entryIndex) => (
          <button
            key={entry.label}
            type="button"
            role="tab"
            id={`${base}-${entryIndex}`}
            aria-selected={entryIndex === index}
            aria-controls={`${base}-panel`}
            className={entryIndex === index ? 'is-on' : undefined}
            onClick={() => setIndex(entryIndex)}
          >
            {entry.label}
          </button>
        ))}
      </div>
      <div className="picker-panel" role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-${index}`}>
        <p className="line">{item.line}</p>
        {item.text ? <p>{item.text}</p> : null}
      </div>
    </div>
  );
}
