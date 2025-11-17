import { IsString } from 'class-validator';

export class ScheduleNoResponseDto {
  @IsString()
  leadId: string;
}
