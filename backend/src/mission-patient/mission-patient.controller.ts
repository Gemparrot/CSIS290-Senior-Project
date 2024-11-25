import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { MissionPatientService } from './mission-patient.service';
import { CreateMissionPatientDto, UpdateMissionPatientDto } from './mission-patient.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common';
import { ExpressRequest } from '../shared/interfaces/express-request.interface';

@Controller('mission-patients')
@UseGuards(JwtAuthGuard)
export class MissionPatientController {
  constructor(private readonly missionPatientService: MissionPatientService) {}

  @Post()
  async create(@Body() createMissionPatientDto: CreateMissionPatientDto, @Req() req: ExpressRequest) {
    if (req.user?.userType !== 'ambulance') {
      throw new UnauthorizedException('Access restricted to ambulance users.');
    }
    return this.missionPatientService.create(createMissionPatientDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req: ExpressRequest) {
    if (req.user?.userType !== 'ambulance') {
      throw new UnauthorizedException('Access restricted to ambulance users.');
    }
    return this.missionPatientService.findOne(id);
  }

  @Get('mission/:missionId')
  async findByMissionId(@Param('missionId') missionId: number, @Req() req: ExpressRequest) {
    if (req.user?.userType !== 'ambulance') {
      throw new UnauthorizedException('Access restricted to ambulance users.');
    }
    return this.missionPatientService.findByMissionId(missionId);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMissionPatientDto: UpdateMissionPatientDto, @Req() req: ExpressRequest) {
    if (req.user?.userType !== 'ambulance') {
      throw new UnauthorizedException('Access restricted to ambulance users.');
    }
    return this.missionPatientService.update(id, updateMissionPatientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req: ExpressRequest) {
    if (req.user?.userType !== 'ambulance') {
      throw new UnauthorizedException('Access restricted to ambulance users.');
    }
    return this.missionPatientService.delete(id);
  }
}