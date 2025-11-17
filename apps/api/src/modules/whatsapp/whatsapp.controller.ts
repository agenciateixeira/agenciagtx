import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappWebhookDto } from './dto/webhook.dto';
import { IdParamDto } from '../../shared/dto/id-param.dto';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('webhook')
  handleWebhook(@Body() payload: WhatsappWebhookDto) {
    return this.whatsappService.registerMessage(payload);
  }

  @Get('leads/:id/messages')
  getMessages(@Param() params: IdParamDto) {
    return this.whatsappService.getMessagesForLead(params.id);
  }
}
