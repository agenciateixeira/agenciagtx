import { useState } from 'react';
import { bridge, fields, stages } from '../../lib/comoPreview';

function LineIcon({ children }) {
  return (
    <svg className="proto-icon" viewBox="0 0 72 80" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

const stageIcons = {
  diagnostico: (
    <LineIcon>
      <path d="M26 16 L44 26 L26 36 L8 26 Z" />
      <path d="M8 26 L8 40 L26 50 L26 36" />
      <path d="M44 26 L44 40 L26 50" />
      <g className="lift">
        <circle cx="50" cy="18" r="8" />
        <path d="M56 24 L64 32" />
      </g>
    </LineIcon>
  ),
  plano: (
    <LineIcon>
      <path d="M36 50 L56 60 L36 70 L16 60 Z" />
      <path d="M16 60 V68 L36 76" />
      <path d="M56 60 V68 L36 76" />
      <g className="lift">
        <path d="M36 30 L56 40 L36 50 L16 40 Z" />
        <path d="M36 10 L56 20 L36 30 L16 20 Z" />
      </g>
    </LineIcon>
  ),
  acompanhamento: (
    <LineIcon>
      <path d="M22 30 L38 38 L22 46 L6 38 Z" />
      <path d="M6 38 L6 50 L22 58 L22 46" />
      <path d="M38 38 L38 50 L22 58" />
      <g className="lift">
        <path d="M40 16 a12 12 0 1 1 -2 10" />
        <path d="M36 14 L40 16 L36 22" />
      </g>
    </LineIcon>
  ),
};

const fieldIcons = {
  atendimento: (
    <LineIcon>
      <path d="M14 16 H46 a6 6 0 0 1 6 6 V36 a6 6 0 0 1 -6 6 H30 L20 52 V42 H14 a6 6 0 0 1 -6 -6 V22 a6 6 0 0 1 6 -6 Z" />
      <path className="lift" d="M22 28 H40" />
      <path className="lift" d="M22 34 H34" />
    </LineIcon>
  ),
  vendas: (
    <LineIcon>
      <path d="M18 18 H42 L50 28 V50 H18 Z" />
      <path d="M42 18 L42 28 L50 28" />
      <path className="lift" d="M26 36 H40" />
      <path className="lift" d="M34 32 L40 36 L34 40" />
    </LineIcon>
  ),
  financeiro: (
    <LineIcon>
      <path d="M16 20 H48 V48 H16 Z" />
      <path d="M16 20 L32 12 L48 20" />
      <path className="lift" d="M24 30 H40" />
      <path className="lift" d="M24 36 H36" />
      <path className="lift" d="M24 42 H32" />
    </LineIcon>
  ),
};

function Reading({ stage, field }) {
  return (
    <div className="proto-reading">
      <div>
        <p className="eyebrow">{stage.label}</p>
        <h3>{stage.line}</h3>
        <p>{stage.text}</p>
      </div>
      <div>
        <p className="eyebrow">{field.label}</p>
        <h3>{field.line}</h3>
        <p>{field.text}</p>
      </div>
    </div>
  );
}

export function PathPreview() {
  const [stageId, setStageId] = useState(stages[0].id);
  const [fieldId, setFieldId] = useState(fields[0].id);
  const stage = stages.find((item) => item.id === stageId);
  const field = fields.find((item) => item.id === fieldId);

  return (
    <div className="proto-path">
      <div className="proto-path-grid">
        <div className="proto-rail" role="group" aria-label="Etapas">
          {stages.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={item.id === stageId ? 'is-on' : ''}
              aria-pressed={item.id === stageId}
              onClick={() => setStageId(item.id)}
            >
              <i data-last={index === stages.length - 1 ? 'true' : 'false'} />
              <span>
                <strong>{item.label}</strong>
                <small>{item.line}</small>
              </span>
            </button>
          ))}
        </div>
        <Reading stage={stage} field={field} />
      </div>
      <p className="proto-bridge">{bridge}</p>
      <div className="proto-lanes" role="group" aria-label="Áreas">
        {fields.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === fieldId ? 'is-on' : ''}
            aria-pressed={item.id === fieldId}
            onClick={() => setFieldId(item.id)}
          >
            <strong>{item.label}</strong>
            <small>{item.line}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

function HoverCard({ item, icon, open, onOpen }) {
  return (
    <button
      type="button"
      className={open ? 'proto-card is-open' : 'proto-card'}
      aria-expanded={open}
      onClick={() => onOpen(item.id)}
      onMouseEnter={() => onOpen(item.id)}
      onFocus={() => onOpen(item.id)}
    >
      {icon}
      <p className="proto-kicker">{item.label}</p>
      <h3>{item.line}</h3>
      <p className="proto-more">{item.text}</p>
    </button>
  );
}

export function CardsPreview() {
  const [openId, setOpenId] = useState(stages[0].id);

  return (
    <div className="proto-cards-wrap">
      <div className="proto-card-grid" role="group" aria-label="Etapas">
        {stages.map((item) => (
          <HoverCard
            key={item.id}
            item={item}
            icon={stageIcons[item.id]}
            open={openId === item.id}
            onOpen={setOpenId}
          />
        ))}
      </div>
      <p className="proto-bridge">{bridge}</p>
      <div className="proto-card-grid" role="group" aria-label="Áreas">
        {fields.map((item) => (
          <HoverCard
            key={item.id}
            item={item}
            icon={fieldIcons[item.id]}
            open={openId === item.id}
            onOpen={setOpenId}
          />
        ))}
      </div>
    </div>
  );
}

export function WeavePreview() {
  const [stageId, setStageId] = useState(stages[0].id);
  const [fieldId, setFieldId] = useState(fields[0].id);
  const stage = stages.find((item) => item.id === stageId);
  const field = fields.find((item) => item.id === fieldId);

  return (
    <div className="proto-weave-wrap">
      <div className="proto-weave" role="group" aria-label="Etapa e área">
        <span className="proto-corner" />
        {fields.map((item) => (
          <span key={item.id} className={item.id === fieldId ? 'proto-col is-on' : 'proto-col'}>{item.label}</span>
        ))}
        {stages.flatMap((row) => (
          [
            <span key={`${row.id}-label`} className={row.id === stageId ? 'proto-row-label is-on' : 'proto-row-label'}>{row.label}</span>,
            ...fields.map((col) => {
              const on = row.id === stageId && col.id === fieldId;
              const hot = row.id === stageId || col.id === fieldId;
              return (
                <button
                  key={`${row.id}-${col.id}`}
                  type="button"
                  className={on ? 'is-on' : hot ? 'is-hot' : ''}
                  aria-pressed={on}
                  aria-label={`${row.label}, ${col.label}`}
                  onClick={() => {
                    setStageId(row.id);
                    setFieldId(col.id);
                  }}
                >
                  <i />
                </button>
              );
            }),
          ]
        ))}
      </div>
      <p className="proto-bridge">{bridge}</p>
      <Reading stage={stage} field={field} />
    </div>
  );
}
