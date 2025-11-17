import { Body, Controller, Get, Post } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { MovePipelineDto } from './dto/move-pipeline.dto';

@Controller('pipeline')
export class PipelineController {
  constructor(private readonly pipelineService: PipelineService) {}

  @Get('stages')
  listStages() {
    return this.pipelineService.listStages();
  }

  @Post('move')
  move(@Body() payload: MovePipelineDto) {
    return this.pipelineService.move(payload);
  }
}
