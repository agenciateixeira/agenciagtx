import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

interface MetaInsight {
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
  actions?: Array<{ action_type: string; value: string }>;
  cost_per_action_type?: Array<{ action_type: string; value: string }>;
  purchase_roas?: Array<{ action_type: string; value: string }>;
  date_start: string;
  date_stop: string;
}

interface MetaCampaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  daily_budget?: string;
  lifetime_budget?: string;
  start_time?: string;
  stop_time?: string;
}

interface MetaAdCreative {
  id: string;
  name?: string;
  title?: string;
  body?: string;
  image_url?: string;
  thumbnail_url?: string;
  video_id?: string;
  object_story_spec?: Record<string, unknown>;
}

@Injectable()
export class MetaAdsService {
  private readonly logger = new Logger(MetaAdsService.name);
  private readonly client: AxiosInstance;
  private readonly adAccountId: string;
  private readonly apiVersion = 'v21.0';

  constructor(private readonly config: ConfigService) {
    const accessToken = this.config.get<string>('META_ACCESS_TOKEN');
    this.adAccountId = this.config.get<string>('META_AD_ACCOUNT_ID') ?? '';

    this.client = axios.create({
      baseURL: `https://graph.facebook.com/${this.apiVersion}`,
      params: { access_token: accessToken },
    });
  }

  // ─── Campanhas ───────────────────────────────────────────

  async getCampaigns(status?: string): Promise<MetaCampaign[]> {
    const params: Record<string, string> = {
      fields: 'name,status,objective,daily_budget,lifetime_budget,start_time,stop_time',
      limit: '100',
    };
    if (status) {
      params.filtering = JSON.stringify([{ field: 'status', operator: 'IN', value: [status] }]);
    }

    const { data } = await this.client.get(`/act_${this.adAccountId}/campaigns`, { params });
    return data.data;
  }

  // ─── Conjuntos de Anúncio ────────────────────────────────

  async getAdSets(campaignId?: string) {
    const endpoint = campaignId
      ? `/${campaignId}/adsets`
      : `/act_${this.adAccountId}/adsets`;

    const { data } = await this.client.get(endpoint, {
      params: {
        fields: 'name,status,daily_budget,lifetime_budget,targeting,optimization_goal,bid_strategy',
        limit: '100',
      },
    });
    return data.data;
  }

  // ─── Anúncios ────────────────────────────────────────────

  async getAds(adSetId?: string) {
    const endpoint = adSetId
      ? `/${adSetId}/ads`
      : `/act_${this.adAccountId}/ads`;

    const { data } = await this.client.get(endpoint, {
      params: {
        fields: 'name,status,creative{id,name,title,body,image_url,thumbnail_url,object_story_spec}',
        limit: '100',
      },
    });
    return data.data;
  }

  // ─── Criativos ───────────────────────────────────────────

  async getAdCreatives(adId?: string): Promise<MetaAdCreative[]> {
    if (adId) {
      const { data } = await this.client.get(`/${adId}`, {
        params: {
          fields: 'creative{id,name,title,body,image_url,thumbnail_url,video_id,object_story_spec}',
        },
      });
      return [data.creative];
    }

    const { data } = await this.client.get(`/act_${this.adAccountId}/adcreatives`, {
      params: {
        fields: 'id,name,title,body,image_url,thumbnail_url,video_id,object_story_spec',
        limit: '100',
      },
    });
    return data.data;
  }

  // ─── Insights (Métricas) ─────────────────────────────────

  async getInsights(
    level: 'account' | 'campaign' | 'adset' | 'ad' = 'campaign',
    since?: string,
    until?: string,
    timeIncrement?: number,
  ): Promise<MetaInsight[]> {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const params: Record<string, string | number> = {
      fields: [
        'campaign_name',
        'adset_name',
        'ad_name',
        'spend',
        'impressions',
        'reach',
        'clicks',
        'cpc',
        'cpm',
        'ctr',
        'frequency',
        'actions',
        'cost_per_action_type',
        'purchase_roas',
      ].join(','),
      time_range: JSON.stringify({
        since: since ?? sevenDaysAgo.toISOString().split('T')[0],
        until: until ?? today.toISOString().split('T')[0],
      }),
      level,
      limit: 500,
    };

    if (timeIncrement) {
      params.time_increment = timeIncrement;
    }

    const { data } = await this.client.get(`/act_${this.adAccountId}/insights`, { params });
    return data.data ?? [];
  }

  // ─── Insights por Campanha Específica ────────────────────

  async getCampaignInsights(campaignId: string, since?: string, until?: string) {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const { data } = await this.client.get(`/${campaignId}/insights`, {
      params: {
        fields: 'campaign_name,spend,impressions,reach,clicks,cpc,cpm,ctr,frequency,actions,cost_per_action_type,purchase_roas',
        time_range: JSON.stringify({
          since: since ?? sevenDaysAgo.toISOString().split('T')[0],
          until: until ?? today.toISOString().split('T')[0],
        }),
      },
    });
    return data.data?.[0] ?? null;
  }

  // ─── Insights por Anúncio (pra detectar fadiga) ──────────

  async getAdInsights(since?: string, until?: string) {
    return this.getInsights('ad', since, until);
  }

  // ─── Insights Diários (pra gráficos de tendência) ────────

  async getDailyInsights(since?: string, until?: string) {
    return this.getInsights('account', since, until, 1);
  }

  // ─── Insights com Breakdown (idade, gênero, etc) ─────────

  async getInsightsWithBreakdown(
    breakdown: 'age' | 'gender' | 'country' | 'region' | 'publisher_platform' | 'device_platform',
    since?: string,
    until?: string,
  ) {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const { data } = await this.client.get(`/act_${this.adAccountId}/insights`, {
      params: {
        fields: 'campaign_name,spend,impressions,clicks,ctr,cpc,actions',
        time_range: JSON.stringify({
          since: since ?? sevenDaysAgo.toISOString().split('T')[0],
          until: until ?? today.toISOString().split('T')[0],
        }),
        breakdowns: breakdown,
        level: 'account',
        limit: 500,
      },
    });
    return data.data ?? [];
  }

  // ─── Verificar Conexão ───────────────────────────────────

  async verifyConnection() {
    try {
      const { data } = await this.client.get(`/act_${this.adAccountId}`, {
        params: { fields: 'name,account_status,currency,timezone_name' },
      });
      this.logger.log(`Conectado à conta: ${data.name}`);
      return { connected: true, account: data };
    } catch (error: any) {
      this.logger.error(`Erro ao conectar: ${error.response?.data?.error?.message ?? error.message}`);
      return {
        connected: false,
        error: error.response?.data?.error?.message ?? error.message,
      };
    }
  }
}
