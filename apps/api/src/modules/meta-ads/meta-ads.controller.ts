import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { MetaAdsService } from './meta-ads.service';

@ApiTags('meta-ads')
@Controller('meta-ads')
export class MetaAdsController {
  constructor(private readonly metaAdsService: MetaAdsService) {}

  @Get('verify')
  verifyConnection() {
    return this.metaAdsService.verifyConnection();
  }

  // ─── Campanhas ───────────────────────────────────────────

  @Get('campaigns')
  @ApiQuery({ name: 'status', required: false, enum: ['ACTIVE', 'PAUSED', 'ARCHIVED'] })
  getCampaigns(@Query('status') status?: string) {
    return this.metaAdsService.getCampaigns(status);
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
  getAdSets(@Query('campaign_id') campaignId?: string) {
    return this.metaAdsService.getAdSets(campaignId);
  }

  // ─── Anúncios ────────────────────────────────────────────

  @Get('ads')
  @ApiQuery({ name: 'adset_id', required: false })
  getAds(@Query('adset_id') adSetId?: string) {
    return this.metaAdsService.getAds(adSetId);
  }

  // ─── Criativos ───────────────────────────────────────────

  @Get('creatives')
  getCreatives() {
    return this.metaAdsService.getAdCreatives();
  }

  @Get('creatives/:adId')
  getCreativeByAd(@Param('adId') adId: string) {
    return this.metaAdsService.getAdCreatives(adId);
  }

  // ─── Insights ────────────────────────────────────────────

  @Get('insights')
  @ApiQuery({ name: 'level', required: false, enum: ['account', 'campaign', 'adset', 'ad'] })
  @ApiQuery({ name: 'since', required: false, example: '2026-03-16' })
  @ApiQuery({ name: 'until', required: false, example: '2026-03-23' })
  getInsights(
    @Query('level') level?: 'account' | 'campaign' | 'adset' | 'ad',
    @Query('since') since?: string,
    @Query('until') until?: string,
  ) {
    return this.metaAdsService.getInsights(level, since, until);
  }

  @Get('insights/daily')
  @ApiQuery({ name: 'since', required: false })
  @ApiQuery({ name: 'until', required: false })
  getDailyInsights(@Query('since') since?: string, @Query('until') until?: string) {
    return this.metaAdsService.getDailyInsights(since, until);
  }

  @Get('insights/ads')
  @ApiQuery({ name: 'since', required: false })
  @ApiQuery({ name: 'until', required: false })
  getAdInsights(@Query('since') since?: string, @Query('until') until?: string) {
    return this.metaAdsService.getAdInsights(since, until);
  }

  @Get('insights/breakdown/:type')
  @ApiQuery({ name: 'since', required: false })
  @ApiQuery({ name: 'until', required: false })
  getInsightsBreakdown(
    @Param('type') type: 'age' | 'gender' | 'country' | 'region' | 'publisher_platform' | 'device_platform',
    @Query('since') since?: string,
    @Query('until') until?: string,
  ) {
    return this.metaAdsService.getInsightsWithBreakdown(type, since, until);
  }
}
