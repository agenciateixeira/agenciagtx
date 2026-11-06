// Portfólio da GTX: só trabalhos reais, com telas reais das lojas e sistemas.
export const categories = [
  { slug: 'e-commerce', label: 'E-commerce' },
  { slug: 'sistemas', label: 'Sistemas' },
  { slug: 'midia-paga', label: 'Mídia paga' },
];

export const cases = [
  {
    slug: 'fine-tune-on-minis',
    client: 'Fine Tune on Minis',
    project: 'Loja Shopify',
    category: 'e-commerce',
    cover: { src: '/portfolio/ft-capa.jpg', alt: 'Home e carrinho da loja Fine Tune on Minis' },
    summary: [
      'Loja de miniaturas diecast 1:64 customizadas à mão, em tiragens extremamente reduzidas.',
      'Tema Shopify customizado com a identidade "Garagem Noturna", carrinho "Pit Stop" em quatro etapas, página de produto por cor, frete Frenet, avaliações Judge.me e domínio próprio.',
    ],
    site: { href: 'https://finetuneonminis.com.br', label: 'finetuneonminis.com.br' },
    gallery: [
      { src: '/vitrine/ft-home-desktop-fold.jpg', w: 1920, h: 1200, alt: 'Home da Fine Tune on Minis no desktop' },
      { src: '/portfolio/ft-datsun.jpg', w: 1600, h: 1200, alt: 'Datsun 510 Wagon na página da loja' },
      { src: '/vitrine/ft-home-desktop-s02.jpg', w: 1920, h: 1200, alt: 'Seção "Nada aqui sai em série"' },
      { src: '/vitrine/ft-home-desktop-s06.jpg', w: 1920, h: 1200, alt: 'Cartões das duas edições' },
      { src: '/vitrine/ft-home-desktop-s08.jpg', w: 1920, h: 1200, alt: 'Seção "Na bancada" e tira de negativos' },
      { src: '/portfolio/ft-celular.jpg', w: 1600, h: 1200, alt: 'Home, produto e carrinho no celular' },
      { src: '/vitrine/ft-pdp-desktop-fold.jpg', w: 1920, h: 1200, alt: 'Página de produto Datsun 510 Wagon Cromo' },
      { src: '/vitrine/ft-pdp-desktop-s02.jpg', w: 1920, h: 1200, alt: 'Quatro etapas na bancada, na página de produto' },
      { src: '/vitrine/ft-cart-desktop.jpg', w: 1920, h: 1200, alt: 'Carrinho Pit Stop no desktop' },
      { src: '/portfolio/ft-marca.jpg', w: 1600, h: 1200, alt: 'Marca Fine Tune on Minis' },
    ],
  },
  {
    slug: 'fluido-e-pool',
    client: 'Fluido e Pool',
    project: 'Loja Shopify',
    category: 'e-commerce',
    cover: { src: '/portfolio/fl-capa.jpg', alt: 'Página de produto da Fluido e Pool no desktop e no celular' },
    summary: [
      'Loja do Fluido da Seda, reconstrutor térmico de 120 ml. A página de produto leva da areia ao mar enquanto a pessoa rola, com preço, 12x e botão de compra no primeiro scroll.',
      'Tema Shopify sob medida em Liquid, com seções próprias de garantia e de Clube Pro, pensado para a velocidade no celular. Loja no ar desde novembro de 2026.',
    ],
    gallery: [
      { src: '/vitrine/fl-d-fold.jpg', w: 1440, h: 900, alt: 'Página de produto do Fluido da Seda' },
      { src: '/vitrine/fl-d-trans.jpg', w: 1440, h: 900, alt: 'Seção "Leve, em segundos"' },
      { src: '/portfolio/fl-celular.jpg', w: 1600, h: 1200, alt: 'Três telas da loja no celular' },
      { src: '/vitrine/fl-d-meio.jpg', w: 1440, h: 900, alt: 'Seção "Seda e uva, em fluido"' },
      { src: '/vitrine/fl-d-mar.jpg', w: 1440, h: 900, alt: 'Seção "Compre com tranquilidade", com garantia e Clube Pro' },
    ],
  },
  {
    slug: 'four-custom-garage',
    client: 'Four Custom Garage',
    project: 'Sistema de gestão',
    category: 'sistemas',
    cover: { src: '/portfolio/four-capa.jpg', alt: 'Telas de estoque e ordens de serviço do sistema da Four Custom Garage' },
    summary: [
      'ERP, CRM e PDV para uma oficina de motocicletas.',
      'Ordens de serviço com fotos e checklist, estoque com curva ABC, PDV, financeiro com DRE e emissão de NF-e e NFS-e.',
    ],
    gallery: [
      { src: '/vitrine/four-app-1.jpg', w: 1920, h: 1072, alt: 'Gestão de estoque com curva ABC' },
      { src: '/vitrine/four-app-2.jpg', w: 1920, h: 1072, alt: 'Ordens de serviço' },
    ],
  },
  {
    slug: 'sneaker-society',
    client: 'Sneaker Society',
    project: 'Mídia paga',
    category: 'midia-paga',
    cover: { src: '/portfolio/sn-capa.jpg', alt: 'Logo da Sneaker Society' },
    summary: [
      'De R$ 19 mil para mais de R$ 60 mil por mês, com o mesmo custo de anúncio.',
      'Gestão de tráfego pago em cima da verba que já existia. Relato de Leonardo Utida. O período entra depois de conferir a conta.',
    ],
    result: { from: 'R$ 19 mil', to: 'R$ 60 mil', note: 'por mês, com o mesmo custo de anúncio' },
    gallery: [],
  },
];

// Blocos da grade da home: cada um leva ao case do cliente.
export const tiles = [
  { slug: 'fine-tune-on-minis', title: 'Loja Shopify', src: '/portfolio/ft-capa.jpg' },
  { slug: 'fluido-e-pool', title: 'Loja Shopify', src: '/portfolio/fl-capa.jpg' },
  { slug: 'four-custom-garage', title: 'Sistema de gestão', src: '/portfolio/four-capa.jpg' },
  { slug: 'fine-tune-on-minis', title: 'Página de produto', src: '/portfolio/ft-datsun.jpg' },
  { slug: 'fluido-e-pool', title: 'Da areia ao mar', src: '/portfolio/fl-areia.jpg' },
  { slug: 'sneaker-society', title: 'Mídia paga', src: '/portfolio/sn-capa.jpg' },
  { slug: 'fine-tune-on-minis', title: 'Carrinho Pit Stop', src: '/portfolio/ft-celular.jpg' },
  { slug: 'fluido-e-pool', title: 'Loja no celular', src: '/portfolio/fl-celular.jpg' },
  { slug: 'fine-tune-on-minis', title: 'Identidade da loja', src: '/portfolio/ft-marca.jpg' },
];

export const bySlug = (slug) => cases.find((item) => item.slug === slug);
export const clientOf = (slug) => bySlug(slug).client;
