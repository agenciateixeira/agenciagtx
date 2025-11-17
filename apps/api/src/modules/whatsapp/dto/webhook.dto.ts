import { IsOptional, IsString } from 'class-validator';

export class WhatsappWebhookDto {
  @IsOptional()
  @IsString()
  leadId?: string;

  @IsString()
  direction: 'in' | 'out';

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
