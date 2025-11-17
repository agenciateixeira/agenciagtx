import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { PrismaService } from '../../core/database/prisma.service';
import { ScheduleNoResponseDto } from './dto/schedule-no-response.dto';
import { LeadHotDto } from './dto/lead-hot.dto';

@Injectable()
export class AutomationsService {
  constructor(
    @InjectQueue('automations') private readonly queue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  async scheduleNoResponse(payload: ScheduleNoResponseDto) {
    await this.queue.add(
      'no-response',
      { leadId: payload.leadId },
      {
        delay: 24 * 60 * 60 * 1000,
        removeOnComplete: true,
      },
    );

    return { status: 'scheduled' };
  }

  async markLeadHot(payload: LeadHotDto) {
    await this.queue.add('lead-hot', payload, { removeOnComplete: true });
    return { status: 'queued' };
  }
}
