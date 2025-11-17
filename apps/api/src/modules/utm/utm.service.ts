import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { TrackUtmDto } from './dto/track-utm.dto';
import { sanitizeText } from '../../shared/utils/normalizers';

@Injectable()
export class UtmService {
  constructor(private readonly prisma: PrismaService) {}

  async track(payload: TrackUtmDto) {
    const entries = Object.entries(payload)
      .filter(([key]) => key !== 'leadId')
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => ({
        leadId: payload.leadId,
        key,
        value: sanitizeText(value as string),
      }));

    if (!entries.length) {
      return { leadId: payload.leadId, utms: [] };
    }

    await this.prisma.leadUTM.createMany({
      data: entries,
    });

    return {
      leadId: payload.leadId,
      utms: entries,
    };
  }
}
