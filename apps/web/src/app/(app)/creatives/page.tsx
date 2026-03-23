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

type AdAccount = {
  id: string;
  name: string;
  account_id: string;
  account_status: number;
  currency: string;
  timezone_name: string;
};

type ActionItem = { action_type: string; value: string };
type VideoActionItem = { action_type: string; value: string };

type CreativeInsight = {
  ad_id: string;
  ad_name: string;
  campaign_name: string;
  spend: string;
  impressions: string;
  reach: string;
  clicks: string;
  cpc: string;
  cpm: string;
  ctr: string;
  frequency: string;
  actions?: ActionItem[];
  video_thru_play_actions?: VideoActionItem[];
  video_p25_watched_actions?: VideoActionItem[];
  video_p50_watched_actions?: VideoActionItem[];
  video_p75_watched_actions?: VideoActionItem[];
  video_p95_watched_actions?: VideoActionItem[];
  video_avg_time_watched_actions?: VideoActionItem[];
  video_play_actions?: VideoActionItem[];
};

type DailyPoint = {
  date_start: string;
  spend: string;
  impressions: string;
  clicks: string;
  ctr: string;
  actions?: ActionItem[];
};

function getActionValue(actions: ActionItem[] | undefined, type: string): number {
  if (!actions) return 0;
  const found = actions.find((a) => a.action_type === type);
  return found ? Number(found.value) : 0;
}

function getVideoActionValue(actions: VideoActionItem[] | undefined): number {
  if (!actions || actions.length === 0) return 0;
  return Number(actions[0]?.value || 0);
}

export default function CreativesPage() {
  const [accounts, setAccounts] = useState<AdAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [creativeInsights, setCreativeInsights] = useState<CreativeInsight[]>([]);
  const [selectedAd, setSelectedAd] = useState<CreativeInsight | null>(null);
  const [dailyData, setDailyData] = useState<DailyPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDaily, setLoadingDaily] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    since: new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0],
    until: new Date().toISOString().split("T")[0],
  });

  // Fetch ad accounts
  useEffect(() => {
    fetch(`${API_BASE}/meta-ads/accounts`)
      .then((r) => r.json())
      .then((data) => {
        const accts = Array.isArray(data) ? data : [];
        setAccounts(accts);
        if (accts.length > 0 && !selectedAccount) {
          setSelectedAccount(accts[0].account_id);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch creative insights
  const fetchCreatives = useCallback(async () => {
    if (!selectedAccount) return;
    setLoading(true);
    setError(null);
    setSelectedAd(null);
    setDailyData([]);
    try {
      const res = await fetch(
        `${API_BASE}/meta-ads/creatives/insights?since=${dateRange.since}&until=${dateRange.until}&account_id=${selectedAccount}`
      );
      const data = await res.json();
      setCreativeInsights(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao buscar criativos");
    } finally {
      setLoading(false);
    }
  }, [selectedAccount, dateRange]);

  useEffect(() => {
    fetchCreatives();
  }, [fetchCreatives]);

  // Fetch daily performance for a specific ad
  const fetchDailyPerformance = async (adId: string) => {
    setLoadingDaily(true);
    try {
      const res = await fetch(
        `${API_BASE}/meta-ads/ads/${adId}/daily?since=${dateRange.since}&until=${dateRange.until}`
      );
      const data = await res.json();
      setDailyData(Array.isArray(data) ? data : []);
    } catch {
      setDailyData([]);
    } finally {
      setLoadingDaily(false);
    }
  };

  const handleSelectAd = (ad: CreativeInsight) => {
    setSelectedAd(ad);
    fetchDailyPerformance(ad.ad_id);
  };

  // Totals
  const totals = creativeInsights.reduce(
    (acc, c) => ({
      spend: acc.spend + Number(c.spend || 0),
      impressions: acc.impressions + Number(c.impressions || 0),
      reach: acc.reach + Number(c.reach || 0),
      clicks: acc.clicks + Number(c.clicks || 0),
      likes: acc.likes + getActionValue(c.actions, "post_reaction"),
      comments: acc.comments + getActionValue(c.actions, "comment"),
      shares: acc.shares + getActionValue(c.actions, "post"),
      videoPlays: acc.videoPlays + getVideoActionValue(c.video_play_actions),
      thruPlays: acc.thruPlays + getVideoActionValue(c.video_thru_play_actions),
    }),
    { spend: 0, impressions: 0, reach: 0, clicks: 0, likes: 0, comments: 0, shares: 0, videoPlays: 0, thruPlays: 0 }
  );

  const selectedAccountInfo = accounts.find((a) => a.account_id === selectedAccount);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Performance</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Análise de Criativos</h1>
          <p className="text-sm text-slate-400">
            Engajamento, retenção de vídeo e performance ao longo do tempo
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Account Switcher */}
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-brand-500 appearance-none cursor-pointer min-w-[200px]"
          >
            {accounts.map((acct) => (
              <option key={acct.account_id} value={acct.account_id} className="bg-slate-900">
                {acct.name} ({acct.currency})
              </option>
            ))}
            {accounts.length === 0 && (
              <option value="" className="bg-slate-900">Carregando contas...</option>
            )}
          </select>

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
            onClick={fetchCreatives}
            className="rounded-xl bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Atualizar
          </button>
        </div>
      </div>

      {/* Account Info */}
      {selectedAccountInfo && (
        <div className="rounded-2xl border border-brand-500/20 bg-brand-500/5 px-5 py-3 text-sm text-brand-300">
          Conta: <span className="font-semibold text-white">{selectedAccountInfo.name}</span>
          {" · "}Moeda: {selectedAccountInfo.currency}
          {" · "}Fuso: {selectedAccountInfo.timezone_name}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          Erro: {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">Carregando criativos...</div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
            {[
              { label: "Impressões", value: formatNumber(totals.impressions), color: "text-blue-400" },
              { label: "Alcance", value: formatNumber(totals.reach), color: "text-cyan-400" },
              { label: "Curtidas", value: formatNumber(totals.likes), color: "text-pink-400" },
              { label: "Comentários", value: formatNumber(totals.comments), color: "text-amber-400" },
              { label: "Compartilhamentos", value: formatNumber(totals.shares), color: "text-green-400" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 p-5">
                <p className="text-sm text-slate-400">{kpi.label}</p>
                <p className={clsx("mt-3 text-2xl font-semibold", kpi.color)}>{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Secondary KPIs */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Investido", value: formatCurrency(totals.spend) },
              { label: "Cliques", value: formatNumber(totals.clicks) },
              { label: "Reproduções de Vídeo", value: formatNumber(totals.videoPlays) },
              { label: "ThruPlays (completo)", value: formatNumber(totals.thruPlays) },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 p-5">
                <p className="text-sm text-slate-400">{kpi.label}</p>
                <p className="mt-3 text-xl font-semibold text-white">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Creatives Table */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Criativos por Anúncio</h2>
            <p className="mb-4 text-xs text-slate-500">Clique em um anúncio para ver o funil de retenção e a performance diária</p>
            <div className="overflow-auto rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Anúncio", "Campanha", "Gasto", "Impressões", "Curtidas", "Comentários", "Shares", "CTR", "CPC", "ThruPlays"].map((h) => (
                      <th key={h} className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {creativeInsights.map((row) => {
                    const likes = getActionValue(row.actions, "post_reaction");
                    const comments = getActionValue(row.actions, "comment");
                    const shares = getActionValue(row.actions, "post");
                    const thruPlays = getVideoActionValue(row.video_thru_play_actions);
                    const isSelected = selectedAd?.ad_id === row.ad_id;

                    return (
                      <tr
                        key={row.ad_id}
                        onClick={() => handleSelectAd(row)}
                        className={clsx(
                          "border-b border-white/5 transition-colors cursor-pointer",
                          isSelected ? "bg-brand-500/10 border-brand-500/20" : "hover:bg-white/5"
                        )}
                      >
                        <td className="px-4 py-3.5 font-medium text-white max-w-[200px] truncate">{row.ad_name}</td>
                        <td className="px-4 py-3.5 text-slate-500 max-w-[150px] truncate">{row.campaign_name}</td>
                        <td className="px-4 py-3.5 text-slate-300">{formatCurrency(row.spend)}</td>
                        <td className="px-4 py-3.5 text-slate-300">{formatNumber(row.impressions)}</td>
                        <td className="px-4 py-3.5 text-pink-400 font-medium">{formatNumber(likes)}</td>
                        <td className="px-4 py-3.5 text-amber-400 font-medium">{formatNumber(comments)}</td>
                        <td className="px-4 py-3.5 text-green-400 font-medium">{formatNumber(shares)}</td>
                        <td className="px-4 py-3.5 text-slate-300">{formatPercent(row.ctr)}</td>
                        <td className="px-4 py-3.5 text-slate-300">{formatCurrency(row.cpc)}</td>
                        <td className="px-4 py-3.5 text-purple-400 font-medium">{formatNumber(thruPlays)}</td>
                      </tr>
                    );
                  })}
                  {creativeInsights.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-5 py-12 text-center text-slate-500">
                        Nenhum criativo encontrado para o período selecionado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Ad Details */}
          {selectedAd && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-white">
                Detalhes: <span className="text-brand-300">{selectedAd.ad_name}</span>
              </h2>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Video Retention Funnel */}
                <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 p-6">
                  <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Funil de Retenção de Vídeo
                  </h3>
                  <VideoRetentionFunnel ad={selectedAd} />
                </div>

                {/* Engagement Breakdown */}
                <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 p-6">
                  <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Engajamento do Criativo
                  </h3>
                  <EngagementBreakdown ad={selectedAd} />
                </div>
              </div>

              {/* Daily Performance Chart */}
              <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 p-6">
                <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Performance ao Longo do Tempo
                </h3>
                {loadingDaily ? (
                  <div className="flex items-center justify-center py-12 text-slate-400">Carregando dados diários...</div>
                ) : (
                  <DailyPerformanceChart data={dailyData} />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Video Retention Funnel ────────────────────────────────

function VideoRetentionFunnel({ ad }: { ad: CreativeInsight }) {
  const plays = getVideoActionValue(ad.video_play_actions);
  const p25 = getVideoActionValue(ad.video_p25_watched_actions);
  const p50 = getVideoActionValue(ad.video_p50_watched_actions);
  const p75 = getVideoActionValue(ad.video_p75_watched_actions);
  const p95 = getVideoActionValue(ad.video_p95_watched_actions);
  const avgTime = getVideoActionValue(ad.video_avg_time_watched_actions);

  if (plays === 0 && p25 === 0) {
    return <p className="py-8 text-center text-slate-500">Este criativo não é um vídeo ou não possui dados de retenção</p>;
  }

  const maxValue = Math.max(plays, p25, p50, p75, p95, 1);

  const steps = [
    { label: "Iniciaram", value: plays, pct: 100, color: "bg-blue-500" },
    { label: "25% assistido", value: p25, pct: plays > 0 ? (p25 / plays) * 100 : 0, color: "bg-cyan-500" },
    { label: "50% assistido", value: p50, pct: plays > 0 ? (p50 / plays) * 100 : 0, color: "bg-amber-500" },
    { label: "75% assistido", value: p75, pct: plays > 0 ? (p75 / plays) * 100 : 0, color: "bg-orange-500" },
    { label: "95% assistido", value: p95, pct: plays > 0 ? (p95 / plays) * 100 : 0, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div key={step.label}>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm text-slate-300">{step.label}</span>
            <span className="text-sm font-semibold text-white">
              {formatNumber(step.value)} <span className="text-slate-500">({step.pct.toFixed(1)}%)</span>
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className={clsx("h-full rounded-full transition-all duration-700", step.color)}
              style={{ width: `${maxValue > 0 ? (step.value / maxValue) * 100 : 0}%` }}
            />
          </div>
        </div>
      ))}
      {avgTime > 0 && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
          <p className="text-xs text-slate-400">Tempo médio assistido</p>
          <p className="mt-1 text-lg font-semibold text-white">{avgTime.toFixed(1)}s</p>
        </div>
      )}
    </div>
  );
}

// ─── Engagement Breakdown ──────────────────────────────────

function EngagementBreakdown({ ad }: { ad: CreativeInsight }) {
  const likes = getActionValue(ad.actions, "post_reaction");
  const comments = getActionValue(ad.actions, "comment");
  const shares = getActionValue(ad.actions, "post");
  const clicks = Number(ad.clicks || 0);
  const saves = getActionValue(ad.actions, "onsite_conversion.post_save");
  const linkClicks = getActionValue(ad.actions, "link_click");

  const items = [
    { label: "Curtidas / Reações", value: likes, icon: "heart", color: "text-pink-400 bg-pink-500/10" },
    { label: "Comentários", value: comments, icon: "comment", color: "text-amber-400 bg-amber-500/10" },
    { label: "Compartilhamentos", value: shares, icon: "share", color: "text-green-400 bg-green-500/10" },
    { label: "Cliques no link", value: linkClicks, icon: "link", color: "text-blue-400 bg-blue-500/10" },
    { label: "Salvamentos", value: saves, icon: "save", color: "text-purple-400 bg-purple-500/10" },
    { label: "Cliques totais", value: clicks, icon: "cursor", color: "text-cyan-400 bg-cyan-500/10" },
  ];

  const totalEngagement = likes + comments + shares;
  const impressions = Number(ad.impressions || 0);
  const engagementRate = impressions > 0 ? ((totalEngagement / impressions) * 100).toFixed(2) : "0.00";

  return (
    <div className="space-y-3">
      {/* Engagement Rate */}
      <div className="mb-4 rounded-2xl border border-brand-500/20 bg-brand-500/5 p-4 text-center">
        <p className="text-xs text-slate-400">Taxa de Engajamento</p>
        <p className="mt-1 text-3xl font-bold text-brand-300">{engagementRate}%</p>
        <p className="mt-1 text-xs text-slate-500">(curtidas + comentários + shares) / impressões</p>
      </div>

      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-white/5">
          <span className="text-sm text-slate-300">{item.label}</span>
          <span className={clsx("rounded-lg px-3 py-1 text-sm font-semibold", item.color)}>
            {formatNumber(item.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Daily Performance Chart ───────────────────────────────

function DailyPerformanceChart({ data }: { data: DailyPoint[] }) {
  const [metric, setMetric] = useState<"spend" | "impressions" | "clicks" | "ctr">("spend");

  if (data.length === 0) {
    return <p className="py-8 text-center text-slate-500">Nenhum dado diário disponível</p>;
  }

  const values = data.map((d) => Number(d[metric] || 0));
  const maxVal = Math.max(...values, 1);
  const minVal = Math.min(...values);

  const formatValue = (v: number) => {
    if (metric === "spend") return formatCurrency(v);
    if (metric === "ctr") return `${v.toFixed(2)}%`;
    return formatNumber(v);
  };

  const metricLabels = {
    spend: "Gasto (R$)",
    impressions: "Impressões",
    clicks: "Cliques",
    ctr: "CTR (%)",
  };

  // Find the peak day
  const peakIndex = values.indexOf(Math.max(...values));
  const peakDate = data[peakIndex]?.date_start;

  return (
    <div>
      {/* Metric selector */}
      <div className="mb-6 flex gap-2">
        {(Object.entries(metricLabels) as [typeof metric, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setMetric(key)}
            className={clsx(
              "rounded-xl px-4 py-2 text-xs font-medium transition-colors",
              metric === key ? "bg-brand-500 text-white" : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Peak indicator */}
      {peakDate && (
        <div className="mb-4 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-2 text-sm">
          <span className="text-slate-400">Pico de performance: </span>
          <span className="font-semibold text-green-400">{peakDate}</span>
          <span className="text-slate-400"> com </span>
          <span className="font-semibold text-white">{formatValue(values[peakIndex])}</span>
        </div>
      )}

      {/* Bar chart */}
      <div className="flex items-end gap-[2px]" style={{ height: 200 }}>
        {data.map((point, i) => {
          const val = Number(point[metric] || 0);
          const height = maxVal > 0 ? (val / maxVal) * 100 : 0;
          const isPeak = i === peakIndex;

          return (
            <div
              key={point.date_start}
              className="group relative flex flex-1 flex-col items-center justify-end"
              style={{ height: "100%" }}
            >
              {/* Tooltip */}
              <div className="pointer-events-none absolute bottom-full mb-2 hidden rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-xs group-hover:block z-10 whitespace-nowrap">
                <p className="font-semibold text-white">{point.date_start}</p>
                <p className="text-slate-300">{formatValue(val)}</p>
              </div>
              <div
                className={clsx(
                  "w-full rounded-t transition-all duration-300",
                  isPeak ? "bg-green-500" : "bg-brand-500/70 hover:bg-brand-400"
                )}
                style={{ height: `${Math.max(height, 2)}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* Date labels */}
      <div className="mt-2 flex justify-between">
        <span className="text-xs text-slate-500">{data[0]?.date_start}</span>
        <span className="text-xs text-slate-500">{data[data.length - 1]?.date_start}</span>
      </div>

      {/* Summary */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-white/5 p-3 text-center">
          <p className="text-xs text-slate-400">Mínimo</p>
          <p className="mt-1 text-sm font-semibold text-white">{formatValue(minVal)}</p>
        </div>
        <div className="rounded-xl bg-white/5 p-3 text-center">
          <p className="text-xs text-slate-400">Média</p>
          <p className="mt-1 text-sm font-semibold text-white">
            {formatValue(values.reduce((a, b) => a + b, 0) / values.length)}
          </p>
        </div>
        <div className="rounded-xl bg-white/5 p-3 text-center">
          <p className="text-xs text-slate-400">Máximo</p>
          <p className="mt-1 text-sm font-semibold text-white">{formatValue(maxVal)}</p>
        </div>
      </div>
    </div>
  );
}
