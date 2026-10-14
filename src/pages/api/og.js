import { ImageResponse } from 'next/og';

export const config = { runtime: 'edge' };

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(138, 98, 68, 0.16)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(212, 165, 116, 0.28)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '60px 80px',
            zIndex: 1,
          }}
        >
          {/* Logo text */}
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 24 }}>
            <span style={{ fontSize: 72, fontWeight: 800, color: '#3a2b22', letterSpacing: -2 }}>
              GTX
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: 28,
              color: '#6a4b34',
              fontWeight: 600,
              marginBottom: 16,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Implantação de IA
          </p>

          {/* Main headline */}
          <h1
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: '#241c17',
              lineHeight: 1.2,
              marginBottom: 24,
              maxWidth: 800,
            }}
          >
            IA na operação da sua empresa
          </h1>

          {/* Description */}
          <p style={{ fontSize: 22, color: '#5e4d42', maxWidth: 700 }}>
            No trabalho que hoje alguém copia, cobra ou lembra
          </p>

          {/* CTA badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 32,
              background: '#3a2b22',
              color: '#f6f0e8',
              padding: '12px 28px',
              borderRadius: 100,
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            agenciagtx.com.br
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
