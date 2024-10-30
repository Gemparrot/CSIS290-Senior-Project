import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { VehicleCheckupService } from './vehicle-checkups.service';
import { VehicleCheckupDto } from './vehicle-checkups.dto';

@Controller('vehicle-checkups')
export class VehicleCheckupController {
  constructor(private readonly vehicleCheckupService: VehicleCheckupService) {}

  @Post()
  create(@Body() createVehicleCheckupDto: VehicleCheckupDto) {
    return this.vehicleCheckupService.create(createVehicleCheckupDto);
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
