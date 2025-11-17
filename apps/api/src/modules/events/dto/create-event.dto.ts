import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  leadId: string;

  @IsString()
  eventType: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
