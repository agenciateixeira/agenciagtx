import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { DEFAULT_PIPELINE } from '../../shared/constants/pipeline.constants';
import { MovePipelineDto } from './dto/move-pipeline.dto';

@Injectable()
export class PipelineService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.ensureDefaultStages();
  }

  async listStages() {
    return this.prisma.pipelineStage.findMany({
      orderBy: { order: 'asc' },
      include: {
        leads: {
          include: {
            lead: true,
          },
        },
      },
    });
  }

  async move(payload: MovePipelineDto) {
    const stage = await this.prisma.pipelineStage.findUnique({ where: { id: payload.stageId } });
    if (!stage) {
      throw new NotFoundException('Stage not found');
    }

    await this.prisma.leadStage.upsert({
      where: { leadId: payload.leadId },
      update: {
        stageId: payload.stageId,
      },
      create: {
        leadId: payload.leadId,
        stageId: payload.stageId,
      },
    });

    return { leadId: payload.leadId, stage: stage.name };
  }

  private async ensureDefaultStages() {
    const count = await this.prisma.pipelineStage.count();
    if (count > 0) {
      return;
    }

    await this.prisma.pipelineStage.createMany({
      data: DEFAULT_PIPELINE,
    });
  }
}
