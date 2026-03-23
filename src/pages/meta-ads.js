import { useState, useEffect, useCallback } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0)
}

function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(Number(value) || 0)
}

function formatPercent(value) {
  return `${Number(value || 0).toFixed(2)}%`
}

export default function MetaAdsDashboard() {
  const [connection, setConnection] = useState(null)
  const [campaigns, setCampaigns] = useState([])
  const [insights, setInsights] = useState([])
  const [adInsights, setAdInsights] = useState([])
  const [dailyInsights, setDailyInsights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState({
    since: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
    until: new Date().toISOString().split('T')[0],
  })

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [connRes, campRes, insRes, adRes, dailyRes] = await Promise.all([
        fetch(`${API_BASE}/meta-ads/verify`).then(r => r.json()),
        fetch(`${API_BASE}/meta-ads/campaigns`).then(r => r.json()),
        fetch(`${API_BASE}/meta-ads/insights?level=campaign&since=${dateRange.since}&until=${dateRange.until}`).then(r => r.json()),
        fetch(`${API_BASE}/meta-ads/insights/ads?since=${dateRange.since}&until=${dateRange.until}`).then(r => r.json()),
        fetch(`${API_BASE}/meta-ads/insights/daily?since=${dateRange.since}&until=${dateRange.until}`).then(r => r.json()),
      ])
      setConnection(connRes)
      setCampaigns(campRes)
      setInsights(insRes)
      setAdInsights(adRes)
      setDailyInsights(dailyRes)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [dateRange])

  useEffect(() => { fetchData() }, [fetchData])

  const totals = insights.reduce((acc, i) => ({
    spend: acc.spend + Number(i.spend || 0),
    impressions: acc.impressions + Number(i.impressions || 0),
    reach: acc.reach + Number(i.reach || 0),
    clicks: acc.clicks + Number(i.clicks || 0),
  }), { spend: 0, impressions: 0, reach: 0, clicks: 0 })

  const avgCTR = totals.impressions ? ((totals.clicks / totals.impressions) * 100).toFixed(2) : '0.00'
  const avgCPC = totals.clicks ? (totals.spend / totals.clicks).toFixed(2) : '0.00'

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Meta Ads Dashboard</h1>
          <p style={{ margin: '4px 0 0', color: '#888', fontSize: 14 }}>
            {connection?.connected
              ? `Conectado: ${connection.account?.name} | ${connection.account?.currency} | ${connection.account?.timezone_name}`
              : connection?.error || 'Verificando conexao...'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input type="date" value={dateRange.since} onChange={e => setDateRange(p => ({ ...p, since: e.target.value }))}
            style={{ background: '#222', border: '1px solid #333', color: '#fff', padding: '8px 12px', borderRadius: 6 }} />
          <span style={{ color: '#666' }}>ate</span>
          <input type="date" value={dateRange.until} onChange={e => setDateRange(p => ({ ...p, until: e.target.value }))}
            style={{ background: '#222', border: '1px solid #333', color: '#fff', padding: '8px 12px', borderRadius: 6 }} />
          <button onClick={fetchData}
            style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
            Atualizar
          </button>
        </div>
      </div>

      <div style={{ padding: '30px 40px' }}>
        {error && (
          <div style={{ background: '#7f1d1d', border: '1px solid #991b1b', padding: 16, borderRadius: 8, marginBottom: 20 }}>
            Erro: {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>Carregando dados da Meta...</div>
        ) : (
          <>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 30 }}>
              {[
                { label: 'Investido', value: formatCurrency(totals.spend), color: '#3b82f6' },
                { label: 'Impressoes', value: formatNumber(totals.impressions), color: '#8b5cf6' },
                { label: 'Alcance', value: formatNumber(totals.reach), color: '#06b6d4' },
                { label: 'Cliques', value: formatNumber(totals.clicks), color: '#10b981' },
                { label: 'CTR Medio', value: `${avgCTR}%`, color: '#f59e0b' },
                { label: 'CPC Medio', value: formatCurrency(avgCPC), color: '#ef4444' },
              ].map((kpi, i) => (
                <div key={i} style={{ background: '#111', border: '1px solid #222', borderRadius: 12, padding: 20, borderLeft: `4px solid ${kpi.color}` }}>
                  <p style={{ margin: 0, fontSize: 13, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>{kpi.label}</p>
                  <p style={{ margin: '8px 0 0', fontSize: 28, fontWeight: 700 }}>{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#111', borderRadius: 8, padding: 4 }}>
              {[
                { key: 'overview', label: 'Campanhas' },
                { key: 'ads', label: 'Anuncios' },
                { key: 'daily', label: 'Diario' },
              ].map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  style={{
                    background: activeTab === tab.key ? '#3b82f6' : 'transparent',
                    color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div style={{ background: '#111', border: '1px solid #222', borderRadius: 12, overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #222' }}>
                      {['Campanha', 'Gasto', 'Impressoes', 'Cliques', 'CTR', 'CPC', 'CPM'].map(h => (
                        <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#888', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {insights.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #1a1a1a' }}>
                        <td style={{ padding: '12px 16px', fontWeight: 500 }}>{row.campaign_name}</td>
                        <td style={{ padding: '12px 16px' }}>{formatCurrency(row.spend)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatNumber(row.impressions)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatNumber(row.clicks)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatPercent(row.ctr)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatCurrency(row.cpc)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatCurrency(row.cpm)}</td>
                      </tr>
                    ))}
                    {insights.length === 0 && (
                      <tr><td colSpan={7} style={{ padding: 30, textAlign: 'center', color: '#666' }}>Nenhum dado encontrado para o periodo selecionado</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'ads' && (
              <div style={{ background: '#111', border: '1px solid #222', borderRadius: 12, overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #222' }}>
                      {['Anuncio', 'Campanha', 'Gasto', 'Impressoes', 'Cliques', 'CTR', 'CPC', 'Frequencia'].map(h => (
                        <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#888', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {adInsights.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #1a1a1a' }}>
                        <td style={{ padding: '12px 16px', fontWeight: 500 }}>{row.ad_name}</td>
                        <td style={{ padding: '12px 16px', color: '#888' }}>{row.campaign_name}</td>
                        <td style={{ padding: '12px 16px' }}>{formatCurrency(row.spend)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatNumber(row.impressions)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatNumber(row.clicks)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatPercent(row.ctr)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatCurrency(row.cpc)}</td>
                        <td style={{ padding: '12px 16px' }}>{row.frequency || '-'}</td>
                      </tr>
                    ))}
                    {adInsights.length === 0 && (
                      <tr><td colSpan={8} style={{ padding: 30, textAlign: 'center', color: '#666' }}>Nenhum dado encontrado</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'daily' && (
              <div style={{ background: '#111', border: '1px solid #222', borderRadius: 12, overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #222' }}>
                      {['Data', 'Gasto', 'Impressoes', 'Cliques', 'CTR', 'CPC'].map(h => (
                        <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#888', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dailyInsights.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #1a1a1a' }}>
                        <td style={{ padding: '12px 16px', fontWeight: 500 }}>{row.date_start}</td>
                        <td style={{ padding: '12px 16px' }}>{formatCurrency(row.spend)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatNumber(row.impressions)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatNumber(row.clicks)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatPercent(row.ctr)}</td>
                        <td style={{ padding: '12px 16px' }}>{formatCurrency(row.cpc)}</td>
                      </tr>
                    ))}
                    {dailyInsights.length === 0 && (
                      <tr><td colSpan={6} style={{ padding: 30, textAlign: 'center', color: '#666' }}>Nenhum dado encontrado</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Campanhas Ativas */}
            <div style={{ marginTop: 30 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Status das Campanhas</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
                {campaigns.map((camp, i) => (
                  <div key={i} style={{ background: '#111', border: '1px solid #222', borderRadius: 10, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{camp.name}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                        background: camp.status === 'ACTIVE' ? '#064e3b' : camp.status === 'PAUSED' ? '#78350f' : '#1f2937',
                        color: camp.status === 'ACTIVE' ? '#34d399' : camp.status === 'PAUSED' ? '#fbbf24' : '#9ca3af',
                      }}>
                        {camp.status}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: '#888' }}>Objetivo: {camp.objective}</p>
                    {camp.daily_budget && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#888' }}>Orcamento diario: {formatCurrency(Number(camp.daily_budget) / 100)}</p>}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
