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
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
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
            background: 'rgba(154, 205, 50, 0.08)',
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
            background: 'rgba(154, 205, 50, 0.05)',
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
            <span style={{ fontSize: 72, fontWeight: 800, color: '#9ACD32', letterSpacing: -2 }}>
              GTX
            </span>
            <span style={{ fontSize: 72, fontWeight: 800, color: '#ffffff', letterSpacing: -2 }}>
              .
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: 28,
              color: '#9ACD32',
              fontWeight: 600,
              marginBottom: 16,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Marketing e Vendas
          </p>

          {/* Main headline */}
          <h1
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: 24,
              maxWidth: 800,
            }}
          >
            Transforme Visitas em Vendas
          </h1>

          {/* Description */}
          <p style={{ fontSize: 22, color: '#999999', maxWidth: 700 }}>
            Especialistas em tráfego pago e transformação digital para seu negócio
          </p>

          {/* CTA badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 32,
              background: '#9ACD32',
              color: '#1a1a1a',
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
