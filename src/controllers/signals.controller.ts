import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { SignalsService } from '../services/signals.service';
import { CreateSignalDto } from './../dto/signal/create-signal.dto';
import { UpdateSignalDto } from './../dto/signal/update-signal.dto';
import { FilterSignalsDto } from './../dto/signal/filter-signals.dto';

@Controller('signals')
export class SignalsController {
  constructor(private readonly signalsService: SignalsService) { }

  @Post()
  create(@Body() payload: CreateSignalDto) {
    return this.signalsService.create(payload);
  }

  @Get()
  findAll(@Query() query: FilterSignalsDto) {
    return this.signalsService.findAll(); //TODO
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signalsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateSignalDto) {
    return this.signalsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signalsService.remove(id);
  }
}
