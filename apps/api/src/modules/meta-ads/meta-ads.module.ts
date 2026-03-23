import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MetaAdsService } from './meta-ads.service';
import { MetaAdsController } from './meta-ads.controller';

@Module({
  imports: [HttpModule],
  controllers: [MetaAdsController],
  providers: [MetaAdsService],
  exports: [MetaAdsService],
})
export class MetaAdsModule {}
