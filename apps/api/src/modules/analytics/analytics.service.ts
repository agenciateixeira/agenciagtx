import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async leadsPerDay() {
    const rows = await this.prisma.$queryRaw<Array<{ date: string; count: bigint }>>(
      Prisma.sql`SELECT date("createdAt") as date, COUNT(*) as count FROM "Lead" GROUP BY date("createdAt") ORDER BY date ASC`,
    );
    return rows.map((row) => ({ date: row.date, count: Number(row.count) }));
  }

  leadsPerSource() {
    return this.prisma.lead.groupBy({
      by: ['source'],
      _count: { _all: true },
      orderBy: { _count: { id: 'desc' } },
    });
  }

  async whatsappResponseRate() {
    const rows = await this.prisma.$queryRaw<Array<{ direction: string; total: bigint }>>(
      Prisma.sql`SELECT "direction", COUNT(*)::bigint AS total FROM "WhatsAppMessage" GROUP BY "direction"`,
    );
    return rows.map((row) => ({ direction: row.direction, total: Number(row.total) }));
  }

  pipelineOverview() {
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
}
