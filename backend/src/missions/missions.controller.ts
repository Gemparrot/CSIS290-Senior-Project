import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { MissionService } from './missions.service';
import { MissionDto } from './missions.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { ExpressRequest } from '../shared/interfaces/express-request.interface';

@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() missionDto: MissionDto, @Req() req: ExpressRequest) {
    const ambulanceId = req.user.userType === 'ambulance' ? Number(req.user.id) : null;
    return this.missionService.create(missionDto, ambulanceId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: ExpressRequest) {
    if (req.user.userType === 'admin' || req.user.userType === 'ambulance') {
      return this.missionService.findAll();
    }
    throw new UnauthorizedException('Access restricted to admin users.');
  }

  @UseGuards(JwtAuthGuard)
  @Get('pending')
  findPending(@Req() req: ExpressRequest) {
    const ambulanceId = req.user.userType === 'ambulance' ? Number(req.user.id) : null;
    return this.missionService.findPending(ambulanceId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: ExpressRequest) {
    const ambulanceId = req.user.userType === 'ambulance' ? Number(req.user.id) : null;
    return this.missionService.findOne(id, ambulanceId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() missionDto: MissionDto, @Req() req: ExpressRequest) {
    const ambulanceId = req.user.userType === 'ambulance' ? Number(req.user.id) : null;
    return this.missionService.update(id, missionDto, ambulanceId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: ExpressRequest) {
    const ambulanceId = req.user.userType === 'ambulance' ? Number(req.user.id) : null;
    return this.missionService.remove(id, ambulanceId);
  }
}
