import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AutomationsService } from './automations.service';
import { ScheduleNoResponseDto } from './dto/schedule-no-response.dto';
import { LeadHotDto } from './dto/lead-hot.dto';

@ApiTags('automations')
@Controller('automations')
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @Post('no-response')
  scheduleNoResponse(@Body() payload: ScheduleNoResponseDto) {
    return this.automationsService.scheduleNoResponse(payload);
  }

  @Post('lead-hot')
  markLeadHot(@Body() payload: LeadHotDto) {
    return this.automationsService.markLeadHot(payload);
  }
}
