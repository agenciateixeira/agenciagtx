import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { AutomationsController } from './automations.controller';
import { AutomationsProcessor } from './automations.processor';
import { PipelineModule } from '../pipeline/pipeline.module';

@Module({
  imports: [BullModule.registerQueue({ name: 'automations' }), PipelineModule],
  controllers: [AutomationsController],
  providers: [AutomationsService, AutomationsProcessor],
  exports: [AutomationsService],
})
export class AutomationsModule {}
