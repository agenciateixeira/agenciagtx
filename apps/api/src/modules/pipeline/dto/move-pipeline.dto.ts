import { IsString } from 'class-validator';

export class MovePipelineDto {
  @IsString()
  leadId: string;

  @IsString()
  stageId: string;
}
