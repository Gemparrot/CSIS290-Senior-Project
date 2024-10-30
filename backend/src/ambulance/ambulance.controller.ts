import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AmbulanceService } from './ambulance.service';
import { AmbulanceDto } from './ambulance.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { ExpressRequest } from '../shared/interfaces/express-request.interface';

@Controller('ambulance')
export class AmbulanceController {
  constructor(private readonly ambulanceService: AmbulanceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createAmbulance(@Body() dto: AmbulanceDto, @Req() req: ExpressRequest) {
    const adminId = Number(req.user.id);
    return this.ambulanceService.createAmbulance(dto, adminId);
  }

  @Post('login')
  async login(@Body() dto: AmbulanceDto) {
    return this.ambulanceService.login(dto);
  }
}