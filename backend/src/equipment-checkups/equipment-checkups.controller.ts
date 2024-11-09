import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { EquipmentCheckupService } from './equipment-checkups.service';
import { EquipmentCheckupDto } from './equipment-checkups.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ExpressRequest } from 'src/shared/interfaces/express-request.interface';

@Controller('equipment-checkups')
@UseGuards(JwtAuthGuard)
export class EquipmentCheckupController {
  constructor(private readonly equipmentCheckupService: EquipmentCheckupService) {}

  @Post('checkup')
  async createCheckup(@Req() req: ExpressRequest) {
    const ambulanceId = parseInt(req.user.id, 10);
    return this.equipmentCheckupService.createCheckup(ambulanceId);
  }

  @Get()
  async findAll(@Req() req: ExpressRequest) {
    const ambulanceId = parseInt(req.user.id, 10);
    return this.equipmentCheckupService.findAllForAmbulance(ambulanceId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: ExpressRequest) {
    const ambulanceId = parseInt(req.user.id, 10);
    const checkup = await this.equipmentCheckupService.findOneForAmbulance(id, ambulanceId);
    if (!checkup) throw new NotFoundException(`Checkup with ID ${id} not found for this ambulance`);
    return checkup;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateEquipmentCheckupDto: EquipmentCheckupDto, @Req() req: ExpressRequest) {
    const ambulanceId = parseInt(req.user.id, 10);
    return this.equipmentCheckupService.updateForAmbulance(id, ambulanceId, updateEquipmentCheckupDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: ExpressRequest) {
    const ambulanceId = parseInt(req.user.id, 10);
    return this.equipmentCheckupService.removeForAmbulance(id, ambulanceId);
  }
}
