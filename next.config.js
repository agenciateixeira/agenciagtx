/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/exclusive', destination: '/contato', permanent: true },
      { source: '/politica-privacidade', destination: '/politica-de-privacidade', permanent: true },
      { source: '/termos-de-uso', destination: '/termos', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'agenciagtx.com.br' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
}

module.exports = nextConfig
