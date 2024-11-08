// src/timestamps/timestamps.controller.ts

import { Controller, Get, Post, Body, Param, ParseIntPipe, Req, UseGuards, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { TimestampsService } from './timestamps.service';
import { CreateTimestampDto } from './timestamps.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ExpressRequest } from 'src/shared/interfaces/express-request.interface';

@Controller('missions/:missionId/timestamps')
@UseGuards(JwtAuthGuard)
export class TimestampsController {
  constructor(private readonly timestampsService: TimestampsService) {}

  @Post()
  async createTimestamp(
    @Param('missionId', ParseIntPipe) missionId: number,
    @Body() createTimestampDto: CreateTimestampDto,
    @Req() req: ExpressRequest,
  ) {
    // Check if the authenticated user has the ambulance userType
    if (req.user?.userType !== 'ambulance') {
      throw new UnauthorizedException('Access restricted to ambulance users.');
    }

    return this.timestampsService.create(missionId, createTimestampDto);
  }

  @Get()
  async findAll(@Param('missionId', ParseIntPipe) missionId: number) {
    return this.timestampsService.findAllForMission(missionId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Param('missionId', ParseIntPipe) missionId: number) {
    const timestamp = await this.timestampsService.findOneForMission(id, missionId);
    if (!timestamp) throw new NotFoundException(`Timestamp with ID ${id} not found for this mission`);
    return timestamp;
  }
}
