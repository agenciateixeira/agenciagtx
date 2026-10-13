const BASE_URL = 'https://www.agenciagtx.com.br';

const pages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/produtos/implantacao-de-ia', priority: '0.9', changefreq: 'monthly' },
  { url: '/produtos/gestao-de-trafego-pago', priority: '0.8', changefreq: 'monthly' },
  { url: '/cases', priority: '0.7', changefreq: 'monthly' },
  { url: '/cases/sneaker-society', priority: '0.6', changefreq: 'monthly' },
  { url: '/sobre', priority: '0.6', changefreq: 'monthly' },
  { url: '/contato', priority: '0.8', changefreq: 'monthly' },
  { url: '/politica-de-privacidade', priority: '0.3', changefreq: 'yearly' },
  { url: '/termos', priority: '0.3', changefreq: 'yearly' },
];

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ({ url, priority, changefreq }) => `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>2026-10-13</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml');
  res.write(generateSiteMap());
  res.end();
  return { props: {} };
}

export default function SiteMap() {}
