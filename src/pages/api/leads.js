const HUBSPOT = 'https://api.hubapi.com';

function clean(value, max = 2000) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function hubspot(path, token, options = {}) {
  const response = await fetch(`${HUBSPOT}${path}`, {
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch (error) {
    json = { raw: text };
  }
  return { ok: response.ok, status: response.status, json };
}

async function saveContact(token, properties) {
  const upsert = await hubspot('/crm/v3/objects/contacts/batch/upsert', token, {
    method: 'POST',
    body: {
      inputs: [
        {
          id: properties.email,
          idProperty: 'email',
          properties,
        },
      ],
    },
  });

  if (upsert.ok && upsert.json?.results?.[0]?.id) {
    return upsert.json.results[0].id;
  }

  const search = await hubspot('/crm/v3/objects/contacts/search', token, {
    method: 'POST',
    body: {
      filterGroups: [
        { filters: [{ propertyName: 'email', operator: 'EQ', value: properties.email }] },
      ],
      limit: 1,
    },
  });

  const existing = search.json?.results?.[0]?.id;
  if (existing) {
    const patched = await hubspot(`/crm/v3/objects/contacts/${existing}`, token, {
      method: 'PATCH',
      body: { properties },
    });
    if (patched.ok) return existing;
  }

  const created = await hubspot('/crm/v3/objects/contacts', token, {
    method: 'POST',
    body: { properties },
  });
  if (created.ok && created.json?.id) return created.json.id;

  const detail = upsert.json?.message || created.json?.message || 'Falha ao gravar contato';
  const error = new Error(detail);
  error.status = upsert.status || created.status;
  throw error;
}

function noteBody(lead) {
  const lines = [
    `Página: ${lead.pagina || ''}`,
    `Interesse: ${lead.interesse || ''}`,
    `Empresa: ${lead.empresa || ''}`,
    `Telefone: ${lead.telefone || ''}`,
    `Mensagem: ${lead.mensagem || ''}`,
    `Origem: site`,
    `Landing: ${lead.landing || ''}`,
    `utm_source: ${lead.utm_source || ''}`,
    `utm_medium: ${lead.utm_medium || ''}`,
    `utm_campaign: ${lead.utm_campaign || ''}`,
    `utm_content: ${lead.utm_content || ''}`,
    `utm_term: ${lead.utm_term || ''}`,
    `gclid: ${lead.gclid || ''}`,
  ];
  return lines.join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Método não permitido.' });
  }

  const body = req.body || {};
  if (clean(body.website)) {
    return res.status(200).json({ ok: true });
  }

  const nome = clean(body.nome, 200);
  const email = clean(body.email, 200).toLowerCase();
  const telefone = clean(body.telefone, 40);
  const empresa = clean(body.empresa, 200);
  const mensagem = clean(body.mensagem, 4000);
  const interesse = clean(body.interesse, 120);
  const pagina = clean(body.pagina, 300);

  if (!nome || !email || !telefone || !empresa || !mensagem || !validEmail(email)) {
    return res.status(400).json({ ok: false, message: 'Preencha nome, email, WhatsApp, empresa e mensagem.' });
  }

  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    return res.status(500).json({ ok: false, message: 'Configuração do servidor incompleta.' });
  }

  const lead = {
    nome,
    email,
    telefone,
    empresa,
    mensagem,
    interesse,
    pagina,
    landing: clean(body.landing, 300),
    utm_source: clean(body.utm_source, 200),
    utm_medium: clean(body.utm_medium, 200),
    utm_campaign: clean(body.utm_campaign, 200),
    utm_content: clean(body.utm_content, 200),
    utm_term: clean(body.utm_term, 200),
    gclid: clean(body.gclid, 200),
  };

  try {
    const contactId = await saveContact(token, {
      email,
      firstname: nome,
      phone: telefone,
      company: empresa,
    });

    const note = await hubspot('/crm/v3/objects/notes', token, {
      method: 'POST',
      body: {
        properties: {
          hs_timestamp: Date.now(),
          hs_note_body: noteBody(lead),
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
          },
        ],
      },
    });

    const isCareer = interesse === 'Carreiras';
    const dealName = [empresa || nome, interesse || pagina].filter(Boolean).join('. ');
    const deal = isCareer
      ? { ok: false }
      : await hubspot('/crm/v3/objects/deals', token, {
      method: 'POST',
      body: {
        properties: {
          dealname: dealName || 'Lead do site',
          pipeline: 'default',
          dealstage: 'appointmentscheduled',
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
          },
        ],
      },
    });

    return res.status(200).json({
      ok: true,
      contactId,
      note: note.ok,
      deal: deal.ok,
    });
  } catch (error) {
    console.error('[leads] HubSpot', error.status || '', error.message);
    return res.status(502).json({ ok: false, message: 'Não foi possível enviar agora. Tente de novo ou chame no WhatsApp.' });
  }
}
