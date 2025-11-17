import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../core/database/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  create(payload: CreateEventDto) {
    return this.prisma.leadEvent.create({
      data: {
        leadId: payload.leadId,
        eventType: payload.eventType,
        metadata: payload.metadata ? (payload.metadata as Prisma.InputJsonValue) : Prisma.JsonNull,
      },
    });
  }
}
