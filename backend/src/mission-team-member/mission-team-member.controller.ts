import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { MissionTeamMemberService } from './mission-team-member.service';
import { CreateMissionTeamMemberDto, UpdateMissionTeamMemberDto } from './mission-team-member.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common';
import { ExpressRequest } from '../shared/interfaces/express-request.interface';

@Controller('mission-team-members')
@UseGuards(JwtAuthGuard)
export class MissionTeamMemberController {
  constructor(private readonly missionTeamMemberService: MissionTeamMemberService) {}

  @Post()
  async create(@Body() createMissionTeamMemberDto: CreateMissionTeamMemberDto, @Req() req: ExpressRequest) {
    if (req.user?.userType !== 'ambulance') {
      throw new UnauthorizedException('Access restricted to ambulance users.');
    }
    return this.missionTeamMemberService.create(createMissionTeamMemberDto);
  }

  @Get()
  async findAll(@Req() req: ExpressRequest) {
    if (req.user?.userType !== 'ambulance') {
      throw new UnauthorizedException('Access restricted to ambulance users.');
    }
    return this.missionTeamMemberService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req: ExpressRequest) {
    if (req.user?.userType !== 'ambulance') {
      throw new UnauthorizedException('Access restricted to ambulance users.');
    }
    return this.missionTeamMemberService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMissionTeamMemberDto: UpdateMissionTeamMemberDto, @Req() req: ExpressRequest) {
    if (req.user?.userType !== 'ambulance') {
      throw new UnauthorizedException('Access restricted to ambulance users.');
    }
    return this.missionTeamMemberService.update(id, updateMissionTeamMemberDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req: ExpressRequest) {
    if (req.user?.userType !== 'ambulance') {
      throw new UnauthorizedException('Access restricted to ambulance users.');
    }
    return this.missionTeamMemberService.delete(id);
  }
}
