import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { QueryLeadDto } from './dto/query-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { IdParamDto } from '../../shared/dto/id-param.dto';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() payload: CreateLeadDto) {
    return this.leadsService.create(payload);
  }

  @Get()
  findAll(@Query() query: QueryLeadDto) {
    return this.leadsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param() params: IdParamDto) {
    return this.leadsService.findOne(params.id);
  }

  @Put(':id')
  update(@Param() params: IdParamDto, @Body() payload: UpdateLeadDto) {
    return this.leadsService.update(params.id, payload);
  }

  @Delete(':id')
  remove(@Param() params: IdParamDto) {
    return this.leadsService.remove(params.id);
  }
}
