export const SITE = 'https://www.agenciagtx.com.br';

export const businessId = `${SITE}/#business`;

export function canonicalUrl(path) {
  if (!path || path === '/') return `${SITE}/`;
  return `${SITE}${path.startsWith('/') ? path : `/${path}`}`;
}

export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: canonicalUrl(crumb.href),
    })),
  };
}

export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: 'GTX',
      inLanguage: 'pt-BR',
      description: 'A GTX implementa inteligência artificial no trabalho repetido da empresa.',
      publisher: { '@id': businessId },
    },
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': businessId,
      name: 'GTX',
      legalName: 'GTX Gestão e Implementações Digitais',
      url: `${SITE}/`,
      logo: `${SITE}/images/logo-gtx.png`,
      image: `${SITE}/images/logo-gtx.png`,
      telephone: '+5519990122773',
      email: 'contato@agenciagtx.com.br',
      taxID: '41.768.146/0001-69',
      description: 'Implantação de IA na operação e gestão de tráfego pago, com atendimento remoto no Brasil desde 2017.',
      areaServed: {
        '@type': 'Country',
        name: 'Brasil',
      },
      sameAs: [
        'https://www.instagram.com/agenciagtx',
        'https://www.facebook.com/agenciagtx',
      ],
    },
    {
      '@type': 'Service',
      '@id': `${SITE}/produtos/implantacao-de-ia#service`,
      name: 'Implantação de IA',
      serviceType: 'Implantação de inteligência artificial na operação',
      url: `${SITE}/produtos/implantacao-de-ia`,
      provider: { '@id': businessId },
      areaServed: 'Brasil',
      description: 'Automação no fluxo que a empresa já tem. Pedido, cobrança e resumo do dia, no canal atual.',
      offers: {
        '@type': 'Offer',
        price: '2000',
        priceCurrency: 'BRL',
        description: 'A partir de R$ 2.000 mensais. O diagnóstico dura 30 minutos e não exige contrato.',
        url: `${SITE}/produtos/implantacao-de-ia`,
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE}/produtos/gestao-de-trafego-pago#service`,
      name: 'Gestão de tráfego pago',
      serviceType: 'Gestão de anúncio em Meta, Google e LinkedIn',
      url: `${SITE}/produtos/gestao-de-trafego-pago`,
      provider: { '@id': businessId },
      areaServed: 'Brasil',
      description: 'Gestão de anúncio no Meta, no Google e no LinkedIn, com uma leitura por semana. Sem proposta de retorno antes de olhar a conta.',
    },
  ],
};
