import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { AutomationsController } from './automations.controller';
import { AutomationsProcessor } from './automations.processor';
import { PipelineModule } from '../pipeline/pipeline.module';

const automationsDisabled = process.env.AUTOMATIONS_DISABLED === 'true';
const queueImports = automationsDisabled ? [] : [BullModule.registerQueue({ name: 'automations' })];
const providers = automationsDisabled ? [AutomationsService] : [AutomationsService, AutomationsProcessor];

@Module({
  imports: [...queueImports, PipelineModule],
  controllers: [AutomationsController],
  providers,
  exports: [AutomationsService],
})
export class AutomationsModule {}
