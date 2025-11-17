import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { WhatsappWebhookDto } from './dto/webhook.dto';
import { normalizePhone, sanitizeText } from '../../shared/utils/normalizers';

@Injectable()
export class WhatsappService {
  constructor(private readonly prisma: PrismaService) {}

  async registerMessage(payload: WhatsappWebhookDto) {
    let leadId = payload.leadId;

    if (!leadId && payload.phone) {
      const lead = await this.prisma.lead.findFirst({
        where: { phone: normalizePhone(payload.phone) },
      });
      leadId = lead?.id;
    }

    return this.prisma.whatsAppMessage.create({
      data: {
        leadId,
        direction: payload.direction,
        content: sanitizeText(payload.content),
      },
    });
  }

  async getMessagesForLead(leadId: string) {
    const lead = await this.prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    return this.prisma.whatsAppMessage.findMany({
      where: { leadId },
      orderBy: { timestamp: 'asc' },
    });
  }
}
