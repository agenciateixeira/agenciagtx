import { Processor, WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { PrismaService } from '../../core/database/prisma.service';
import { PipelineService } from '../pipeline/pipeline.service';

@Processor('automations')
export class AutomationsProcessor extends WorkerHost {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pipelineService: PipelineService,
  ) {
    super();
  }

  async process(job: Job<{ leadId: string }>) {
    if (job.name === 'no-response') {
      await this.handleNoResponse(job);
      return;
    }

    if (job.name === 'lead-hot') {
      await this.handleLeadHot(job);
    }
  }

  private async handleNoResponse(job: Job<{ leadId: string }>) {
    await this.prisma.leadEvent.create({
      data: {
        leadId: job.data.leadId,
        eventType: 'no_response',
      },
    });
  }

  private async handleLeadHot(job: Job<{ leadId: string }>) {
    const stage = await this.prisma.pipelineStage.findFirst({ where: { name: 'interested' } });
    if (!stage) {
      return;
    }

    await this.pipelineService.move({ leadId: job.data.leadId, stageId: stage.id });
    await this.prisma.leadEvent.create({
      data: {
        leadId: job.data.leadId,
        eventType: 'lead_hot',
      },
    });
  }
}
