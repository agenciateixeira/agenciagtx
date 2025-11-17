import { Module } from '@nestjs/common';
import { UtmService } from './utm.service';
import { UtmController } from './utm.controller';

@Module({
  controllers: [UtmController],
  providers: [UtmService],
  exports: [UtmService],
})
export class UtmModule {}
