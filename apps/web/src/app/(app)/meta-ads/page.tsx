"use client";

import { useState, useEffect, useCallback } from "react";
import { clsx } from "clsx";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function formatCurrency(value: string | number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value) || 0);
}

function formatNumber(value: string | number) {
  return new Intl.NumberFormat("pt-BR").format(Number(value) || 0);
}

function formatPercent(value: string | number) {
  return `${Number(value || 0).toFixed(2)}%`;
}

type Insight = {
  campaign_name?: string;
  adset_name?: string;
  ad_name?: string;
  spend: string;
  impressions: string;
  reach?: string;
  clicks: string;
  cpc: string;
  cpm: string;
  ctr: string;
  frequency?: string;
  date_start?: string;
  date_stop?: string;
};

type Campaign = {
  id: string;
  name: string;
  status: string;
  objective: string;
  daily_budget?: string;
  lifetime_budget?: string;
};

type ConnectionStatus = {
  connected: boolean;
  account?: { name: string; currency: string; timezone_name: string };
  error?: string;
};

export default function MetaAdsPage() {
  const [connection, setConnection] = useState<ConnectionStatus | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [adInsights, setAdInsights] = useState<Insight[]>([]);
  const [dailyInsights, setDailyInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState({
    since: new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0],
    until: new Date().toISOString().split("T")[0],
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [connRes, campRes, insRes, adRes, dailyRes] = await Promise.all([
        fetch(`${API_BASE}/meta-ads/verify`).then((r) => r.json()),
        fetch(`${API_BASE}/meta-ads/campaigns`).then((r) => r.json()),
        fetch(`${API_BASE}/meta-ads/insights?level=campaign&since=${dateRange.since}&until=${dateRange.until}`).then((r) => r.json()),
        fetch(`${API_BASE}/meta-ads/insights/ads?since=${dateRange.since}&until=${dateRange.until}`).then((r) => r.json()),
        fetch(`${API_BASE}/meta-ads/insights/daily?since=${dateRange.since}&until=${dateRange.until}`).then((r) => r.json()),
      ]);
      setConnection(connRes);
      setCampaigns(campRes);
      setInsights(Array.isArray(insRes) ? insRes : []);
      setAdInsights(Array.isArray(adRes) ? adRes : []);
      setDailyInsights(Array.isArray(dailyRes) ? dailyRes : []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totals = insights.reduce(
    (acc, i) => ({
      spend: acc.spend + Number(i.spend || 0),
      impressions: acc.impressions + Number(i.impressions || 0),
      reach: acc.reach + Number(i.reach || 0),
      clicks: acc.clicks + Number(i.clicks || 0),
    }),
    { spend: 0, impressions: 0, reach: 0, clicks: 0 },
  );

  const avgCTR = totals.impressions ? ((totals.clicks / totals.impressions) * 100).toFixed(2) : "0.00";
  const avgCPC = totals.clicks ? (totals.spend / totals.clicks).toFixed(2) : "0.00";

  const kpis = [
    { label: "Investido", value: formatCurrency(totals.spend) },
    { label: "Impressões", value: formatNumber(totals.impressions) },
    { label: "Alcance", value: formatNumber(totals.reach) },
    { label: "Cliques", value: formatNumber(totals.clicks) },
    { label: "CTR Médio", value: `${avgCTR}%` },
    { label: "CPC Médio", value: formatCurrency(avgCPC) },
  ];

  const tabs = [
    { key: "overview", label: "Campanhas" },
    { key: "ads", label: "Anúncios" },
    { key: "daily", label: "Diário" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Performance</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Meta Ads</h1>
          <p className="text-sm text-slate-400">
            {connection?.connected
              ? `Conectado: ${connection.account?.name} · ${connection.account?.currency} · ${connection.account?.timezone_name}`
              : connection?.error || "Verificando conexão..."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={dateRange.since}
            onChange={(e) => setDateRange((p) => ({ ...p, since: e.target.value }))}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
          />
          <span className="text-slate-500">até</span>
          <input
            type="date"
            value={dateRange.until}
            onChange={(e) => setDateRange((p) => ({ ...p, until: e.target.value }))}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
          />
          <button
            onClick={fetchData}
            className="rounded-xl bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Atualizar
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          Erro: {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">Carregando dados da Meta...</div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 p-5">
                <p className="text-sm text-slate-400">{kpi.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 rounded-2xl border border-white/5 bg-white/5 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={clsx(
                  "rounded-xl px-5 py-2.5 text-sm font-medium transition-colors",
                  activeTab === tab.key ? "bg-brand-500 text-white" : "text-slate-400 hover:text-white hover:bg-white/5",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table: Campanhas */}
          {activeTab === "overview" && (
            <div className="overflow-auto rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Campanha", "Gasto", "Impressões", "Cliques", "CTR", "CPC", "CPM"].map((h) => (
                      <th key={h} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {insights.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 transition-colors hover:bg-white/5">
                      <td className="px-5 py-3.5 font-medium text-white">{row.campaign_name}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatCurrency(row.spend)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatNumber(row.impressions)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatNumber(row.clicks)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatPercent(row.ctr)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatCurrency(row.cpc)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatCurrency(row.cpm)}</td>
                    </tr>
                  ))}
                  {insights.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-slate-500">
                        Nenhum dado encontrado para o período selecionado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Table: Anúncios */}
          {activeTab === "ads" && (
            <div className="overflow-auto rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Anúncio", "Campanha", "Gasto", "Impressões", "Cliques", "CTR", "CPC", "Frequência"].map((h) => (
                      <th key={h} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {adInsights.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 transition-colors hover:bg-white/5">
                      <td className="px-5 py-3.5 font-medium text-white">{row.ad_name}</td>
                      <td className="px-5 py-3.5 text-slate-500">{row.campaign_name}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatCurrency(row.spend)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatNumber(row.impressions)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatNumber(row.clicks)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatPercent(row.ctr)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatCurrency(row.cpc)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{row.frequency || "-"}</td>
                    </tr>
                  ))}
                  {adInsights.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-5 py-12 text-center text-slate-500">
                        Nenhum dado encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Table: Diário */}
          {activeTab === "daily" && (
            <div className="overflow-auto rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Data", "Gasto", "Impressões", "Cliques", "CTR", "CPC"].map((h) => (
                      <th key={h} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dailyInsights.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 transition-colors hover:bg-white/5">
                      <td className="px-5 py-3.5 font-medium text-white">{row.date_start}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatCurrency(row.spend)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatNumber(row.impressions)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatNumber(row.clicks)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatPercent(row.ctr)}</td>
                      <td className="px-5 py-3.5 text-slate-300">{formatCurrency(row.cpc)}</td>
                    </tr>
                  ))}
                  {dailyInsights.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-slate-500">
                        Nenhum dado encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Status das Campanhas */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Status das Campanhas</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {campaigns.map((camp) => (
                <div key={camp.id} className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{camp.name}</span>
                    <span
                      className={clsx(
                        "rounded-full px-3 py-1 text-xs font-bold",
                        camp.status === "ACTIVE" && "bg-green-500/20 text-green-400",
                        camp.status === "PAUSED" && "bg-yellow-500/20 text-yellow-400",
                        camp.status !== "ACTIVE" && camp.status !== "PAUSED" && "bg-slate-500/20 text-slate-400",
                      )}
                    >
                      {camp.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">Objetivo: {camp.objective}</p>
                  {camp.daily_budget && (
                    <p className="mt-1 text-xs text-slate-400">
                      Orçamento diário: {formatCurrency(Number(camp.daily_budget) / 100)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
