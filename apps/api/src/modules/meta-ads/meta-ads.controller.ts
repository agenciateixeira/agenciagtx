import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { MetaAdsService } from './meta-ads.service';

@ApiTags('meta-ads')
@Controller('meta-ads')
export class MetaAdsController {
  constructor(private readonly metaAdsService: MetaAdsService) {}

  @Get('verify')
  @ApiQuery({ name: 'account_id', required: false })
  verifyConnection(@Query('account_id') accountId?: string) {
    return this.metaAdsService.verifyConnection(accountId);
  }

  // ─── Multi-tenant: Listar contas ───────────────────────

  @Get('accounts')
  getAdAccounts() {
    return this.metaAdsService.getAdAccounts();
  }

  // ─── Campanhas ───────────────────────────────────────────

  @Get('campaigns')
  @ApiQuery({ name: 'status', required: false, enum: ['ACTIVE', 'PAUSED', 'ARCHIVED'] })
  @ApiQuery({ name: 'account_id', required: false })
  getCampaigns(@Query('status') status?: string, @Query('account_id') accountId?: string) {
    return this.metaAdsService.getCampaigns(status, accountId);
  }

  @Get('campaigns/:id/insights')
  @ApiQuery({ name: 'since', required: false, example: '2026-03-16' })
  @ApiQuery({ name: 'until', required: false, example: '2026-03-23' })
  getCampaignInsights(
    @Param('id') id: string,
    @Query('since') since?: string,
    @Query('until') until?: string,
  ) {
    return this.metaAdsService.getCampaignInsights(id, since, until);
  }

  // ─── Conjuntos de Anúncio ────────────────────────────────

  @Get('adsets')
  @ApiQuery({ name: 'campaign_id', required: false })
  @ApiQuery({ name: 'account_id', required: false })
  getAdSets(@Query('campaign_id') campaignId?: string, @Query('account_id') accountId?: string) {
    return this.metaAdsService.getAdSets(campaignId, accountId);
  }

  // ─── Anúncios ────────────────────────────────────────────

  @Get('ads')
  @ApiQuery({ name: 'adset_id', required: false })
  @ApiQuery({ name: 'account_id', required: false })
  getAds(@Query('adset_id') adSetId?: string, @Query('account_id') accountId?: string) {
    return this.metaAdsService.getAds(adSetId, accountId);
  }

  // ─── Criativos ───────────────────────────────────────────

  @Get('creatives')
  @ApiQuery({ name: 'account_id', required: false })
  getCreatives(@Query('account_id') accountId?: string) {
    return this.metaAdsService.getAdCreatives(undefined, accountId);
  }

  // ─── Insights de Criativos (engajamento + vídeo) ────────
  // IMPORTANTE: deve vir ANTES de creatives/:adId para não conflitar

  @Get('creatives/insights')
  @ApiQuery({ name: 'since', required: false })
  @ApiQuery({ name: 'until', required: false })
  @ApiQuery({ name: 'account_id', required: false })
  getCreativeInsights(
    @Query('since') since?: string,
    @Query('until') until?: string,
    @Query('account_id') accountId?: string,
  ) {
    return this.metaAdsService.getCreativeInsights(since, until, accountId);
  }

  @Get('creatives/:adId')
  getCreativeByAd(@Param('adId') adId: string) {
    return this.metaAdsService.getAdCreatives(adId);
  }

  // ─── Performance diária de um anúncio ───────────────────

  @Get('ads/:adId/daily')
  @ApiQuery({ name: 'since', required: false })
  @ApiQuery({ name: 'until', required: false })
  getAdDailyPerformance(
    @Param('adId') adId: string,
    @Query('since') since?: string,
    @Query('until') until?: string,
  ) {
    return this.metaAdsService.getAdDailyPerformance(adId, since, until);
  }

  // ─── Insights ────────────────────────────────────────────

  @Get('insights')
  @ApiQuery({ name: 'level', required: false, enum: ['account', 'campaign', 'adset', 'ad'] })
  @ApiQuery({ name: 'since', required: false, example: '2026-03-16' })
  @ApiQuery({ name: 'until', required: false, example: '2026-03-23' })
  @ApiQuery({ name: 'account_id', required: false })
  getInsights(
    @Query('level') level?: 'account' | 'campaign' | 'adset' | 'ad',
    @Query('since') since?: string,
    @Query('until') until?: string,
    @Query('account_id') accountId?: string,
  ) {
    return this.metaAdsService.getInsights(level, since, until, undefined, accountId);
  }

  @Get('insights/daily')
  @ApiQuery({ name: 'since', required: false })
  @ApiQuery({ name: 'until', required: false })
  @ApiQuery({ name: 'account_id', required: false })
  getDailyInsights(
    @Query('since') since?: string,
    @Query('until') until?: string,
    @Query('account_id') accountId?: string,
  ) {
    return this.metaAdsService.getDailyInsights(since, until, accountId);
  }

  @Get('insights/ads')
  @ApiQuery({ name: 'since', required: false })
  @ApiQuery({ name: 'until', required: false })
  @ApiQuery({ name: 'account_id', required: false })
  getAdInsights(
    @Query('since') since?: string,
    @Query('until') until?: string,
    @Query('account_id') accountId?: string,
  ) {
    return this.metaAdsService.getAdInsights(since, until, accountId);
  }

  @Get('insights/breakdown/:type')
  @ApiQuery({ name: 'since', required: false })
  @ApiQuery({ name: 'until', required: false })
  @ApiQuery({ name: 'account_id', required: false })
  getInsightsBreakdown(
    @Param('type') type: 'age' | 'gender' | 'country' | 'region' | 'publisher_platform' | 'device_platform',
    @Query('since') since?: string,
    @Query('until') until?: string,
    @Query('account_id') accountId?: string,
  ) {
    return this.metaAdsService.getInsightsWithBreakdown(type, since, until, accountId);
  }
}
