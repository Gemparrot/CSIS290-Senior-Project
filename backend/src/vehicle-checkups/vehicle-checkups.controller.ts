import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { VehicleCheckupService } from './vehicle-checkups.service';
import { VehicleCheckupDto } from './vehicle-checkups.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ExpressRequest } from 'src/shared/interfaces/express-request.interface';

@Controller('vehicle-checkups')
export class VehicleCheckupController {
  constructor(private readonly vehicleCheckupService: VehicleCheckupService) {}

  @Post('checkup')
  @UseGuards(JwtAuthGuard)
  async createCheckup(@Req() req: ExpressRequest) {
  const ambulanceId = parseInt(req.user.id, 10); // Get the ambulance ID from the logged-in user and parse it to a number
  // Now you can use ambulanceId to create a new vehicle checkup record.
  return this.vehicleCheckupService.createCheckup(ambulanceId);
}


  @Get()
  findAll() {
    return this.vehicleCheckupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleCheckupService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateVehicleCheckupDto: VehicleCheckupDto) {
    return this.vehicleCheckupService.update(id, updateVehicleCheckupDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleCheckupService.remove(id);
  }
}
