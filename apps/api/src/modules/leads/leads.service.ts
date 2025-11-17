import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { QueryLeadDto } from './dto/query-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import {
  normalizeEmail,
  normalizePhone,
  normalizeRegion,
  removeLeadDuplicates,
  sanitizeText,
} from '../../shared/utils/normalizers';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateLeadDto) {
    const normalizedEmail = payload.email ? normalizeEmail(payload.email) : undefined;
    const normalizedPhone = payload.phone ? normalizePhone(payload.phone) : undefined;
    const normalizedRegion = payload.region ? normalizeRegion(payload.region) : undefined;

    await removeLeadDuplicates(this.prisma, normalizedEmail, normalizedPhone);

    const lead = await this.prisma.lead.create({
      data: {
        name: payload.name?.trim(),
        email: normalizedEmail,
        phone: normalizedPhone,
        region: normalizedRegion,
        source: payload.source,
      },
    });

    const stage = await this.prisma.pipelineStage.findFirst({
      where: { name: 'new' },
    });

    if (stage) {
      await this.prisma.leadStage.create({
        data: {
          leadId: lead.id,
          stageId: stage.id,
        },
      });
    }

    if (payload.utms?.length) {
      await this.prisma.leadUTM.createMany({
        data: payload.utms.map((utm) => ({
          leadId: lead.id,
          key: sanitizeText(utm.key),
          value: sanitizeText(utm.value),
        })),
      });
    }

    await this.prisma.leadEvent.create({
      data: {
        leadId: lead.id,
        eventType: 'lead_created',
        metadata: { source: payload.source ?? 'unknown' },
      },
    });

    return lead;
  }

  async findAll(query: QueryLeadDto) {
    const where: Record<string, unknown> = {};
    if (query.stage) {
      where.stage = {
        is: {
          stage: {
            name: query.stage,
          },
        },
      };
    }
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { phone: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: query.skip,
        take: query.limit,
        include: {
          stage: {
            include: { stage: true },
          },
        },
      }),
      this.prisma.lead.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
      },
    };
  }

  async findOne(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: {
        utms: true,
        events: true,
        stage: {
          include: { stage: true },
        },
        whatsapp: true,
      },
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    return lead;
  }

  async update(id: string, payload: UpdateLeadDto) {
    await this.findOne(id);

    const updatedLead = await this.prisma.lead.update({
      where: { id },
      data: {
        name: payload.name?.trim(),
        source: payload.source,
        email: payload.email ? normalizeEmail(payload.email) : undefined,
        phone: payload.phone ? normalizePhone(payload.phone) : undefined,
        region: payload.region ? normalizeRegion(payload.region) : undefined,
      },
    });

    if (payload.utms?.length) {
      await this.prisma.leadUTM.createMany({
        data: payload.utms.map((utm) => ({
          leadId: id,
          key: sanitizeText(utm.key),
          value: sanitizeText(utm.value),
        })),
        skipDuplicates: true,
      });
    }

    return updatedLead;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.lead.delete({ where: { id } });
    return { id };
  }
}
