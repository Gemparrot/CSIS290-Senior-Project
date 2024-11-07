import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { VehicleCheckupService } from './vehicle-checkups.service';
import { VehicleCheckupDto } from './vehicle-checkups.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ExpressRequest } from 'src/shared/interfaces/express-request.interface';

@Controller('vehicle-checkups')
@UseGuards(JwtAuthGuard)
export class VehicleCheckupController {
  constructor(private readonly vehicleCheckupService: VehicleCheckupService) {}

  @Post('checkup')
  async createCheckup(@Req() req: ExpressRequest) {
    const ambulanceId = parseInt(req.user.id, 10); 
    return this.vehicleCheckupService.createCheckup(ambulanceId);
  }

  @Get()
  async findAll(@Req() req: ExpressRequest) {
    const ambulanceId = parseInt(req.user.id, 10);
    return this.vehicleCheckupService.findAllForAmbulance(ambulanceId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: ExpressRequest) {
    const ambulanceId = parseInt(req.user.id, 10);
    const checkup = await this.vehicleCheckupService.findOneForAmbulance(id, ambulanceId);
    if (!checkup) throw new NotFoundException(`Checkup with ID ${id} not found for this ambulance`);
    return checkup;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateVehicleCheckupDto: VehicleCheckupDto, @Req() req: ExpressRequest) {
    const ambulanceId = parseInt(req.user.id, 10);
    return this.vehicleCheckupService.updateForAmbulance(id, ambulanceId, updateVehicleCheckupDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: ExpressRequest) {
    const ambulanceId = parseInt(req.user.id, 10);
    return this.vehicleCheckupService.removeForAmbulance(id, ambulanceId);
  }
}
