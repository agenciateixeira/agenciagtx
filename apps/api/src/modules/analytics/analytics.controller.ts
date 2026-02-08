import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('leads/daily')
  leadsPerDay() {
    return this.analyticsService.leadsPerDay();
  }

  @Get('leads/source')
  leadsPerSource() {
    return this.analyticsService.leadsPerSource();
  }

  @Get('whatsapp/response')
  whatsappResponse() {
    return this.analyticsService.whatsappResponseRate();
  }

  @Get('pipeline')
  pipeline() {
    return this.analyticsService.pipelineOverview();
  }
}
