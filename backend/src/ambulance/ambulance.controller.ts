import { Controller, Post, Body } from '@nestjs/common';
import { AmbulanceService } from './ambulance.service';
import { AmbulanceDto } from './ambulance.dto';

@Controller('ambulance')
export class AmbulanceController {
  constructor(private readonly ambulanceService: AmbulanceService) {}

  @Post('create')
  async createAmbulance(@Body() dto: AmbulanceDto) {
    return this.ambulanceService.createAmbulance(dto);
  }

  @Post('login')
  async login(@Body() dto: AmbulanceDto) {
    return this.ambulanceService.login(dto);
  }
}