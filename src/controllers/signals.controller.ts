import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { SignalsService } from '../services/signals.service';
import { CreateSignalDto } from './../dto/signal/create-signal.dto';
import { UpdateSignalDto } from './../dto/signal/update-signal.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Signals')
@Controller('signals')
export class SignalsController {
  constructor(private readonly signalsService: SignalsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new signal' })
  @ApiResponse({ status: 201, description: 'Signal created' })
  create(@Body() payload: CreateSignalDto) {
    return this.signalsService.create(payload);
  }

  @Get()
  @ApiOperation({ summary: 'List signals' })
  findAll() {
    return this.signalsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get signal by id' })
  findOne(@Param('id') id: string) {
    return this.signalsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update signal by id' })
  update(@Param('id') id: string, @Body() payload: UpdateSignalDto) {
    return this.signalsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete signal by id' })
  remove(@Param('id') id: string) {
    return this.signalsService.remove(id);
  }
}
