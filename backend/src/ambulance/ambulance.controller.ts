import { Controller, Post, Body, Req, UseGuards, Get, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { AmbulanceService } from './ambulance.service';
import { AmbulanceDto } from './ambulance.dto';
import { RegisterAmbulanceDto } from './ambulance.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { ExpressRequest } from '../shared/interfaces/express-request.interface';

@Controller('ambulance')
export class AmbulanceController {
  constructor(private readonly ambulanceService: AmbulanceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createAmbulance(@Body() dto: RegisterAmbulanceDto, @Req() req: ExpressRequest) {
    console.log("controlerr:", dto);
    return this.ambulanceService.createAmbulance(dto);
  }

  @Post('login')
  async login(@Body() dto: AmbulanceDto) {
    return this.ambulanceService.login(dto);
  }

  /////
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllAmbulances(
    @Query('adminId') adminId: number, 
    @Req() req: ExpressRequest
  ): Promise<AmbulanceDto[]> {
    // Optional additional validation
    if (!adminId) {
      adminId = Number(req.user.id);
    }

    if (!adminId || isNaN(adminId)) {
      throw new BadRequestException('Invalid admin ID');
    }
    return this.ambulanceService.getAllAmbulances(adminId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyAmbulance(@Req() req): Promise<AmbulanceDto> {
    const ambulanceId = req.user.sub; // Extract ambulance ID from JWT payload
    return this.ambulanceService.getAmbulanceById(ambulanceId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/admin/:adminId')
  async getAmbulanceByAdminId(@Param('id') id: number, @Param('adminId') adminId: number): Promise<AmbulanceDto> {
    return this.ambulanceService.getAmbulanceByAdminId(id, adminId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
async updateAmbulance(
  @Param('id') id: string,
  @Body() dto: AmbulanceDto,
  @Req() req: ExpressRequest,
) {
  const adminId = Number(req.user.id);
  return this.ambulanceService.updateAmbulance(Number(id), dto, adminId);
}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
async deleteAmbulance(@Param('id') id: string, @Req() req: ExpressRequest) {
  const adminId = Number(req.user.id);
  return this.ambulanceService.deleteAmbulance(Number(id), adminId);
}
}
