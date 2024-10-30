// missions.controller.ts - auto generated file
// mission.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { MissionService } from './missions.service';
import { MissionDto } from './missions.dto';

@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post()
  create(@Body() missionDto: MissionDto) {
    return this.missionService.create(missionDto);
  }

  @Get()
  findAll() {
    return this.missionService.findAll();
  }

  @Get('pending')
  findPending() {
    return this.missionService.findPending();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.missionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() missionDto: MissionDto) {
    return this.missionService.update(id, missionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.missionService.remove(id);
  }
}
