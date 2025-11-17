import { IsString } from 'class-validator';

export class LeadHotDto {
  @IsString()
  leadId: string;
}
