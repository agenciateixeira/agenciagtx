import { PaginationDto } from '../../../shared/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class QueryLeadDto extends PaginationDto {
  @IsOptional()
  @IsString()
  stage?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
