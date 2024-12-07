import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  ParseIntPipe,
  Body,
  Req,
  UseGuards,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PCRService } from './pcr.service';
import { CreatePCRDto, UpdatePCRDto } from './pcr.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ExpressRequest } from 'src/shared/interfaces/express-request.interface';

@Controller('missions/:missionId/pcr')
@UseGuards(JwtAuthGuard)
export class PCRController {
  constructor(private readonly pcrService: PCRService) {}

  @Post()
  async createPCR(
    @Param('missionId', ParseIntPipe) missionId: number,
    @Body() createPCRDto: CreatePCRDto,
    @Req() req: ExpressRequest,
  ) {
    if (req.user?.userType !== 'ambulance') {
      throw new UnauthorizedException('Access restricted to ambulance users.');
    }

    if (!createPCRDto.patientId) {
      throw new NotFoundException('Patient ID is required for PCR creation.');
    }

    return this.pcrService.create(missionId, createPCRDto.patientId, createPCRDto);
  }

  @Put(':id')
  async updatePCR(
    @Param('id', ParseIntPipe) id: number,
    @Param('missionId', ParseIntPipe) missionId: number,
    @Body() updatePCRDto: UpdatePCRDto,
    @Req() req: ExpressRequest,
  ) {
    if (req.user?.userType !== 'ambulance') {
      throw new UnauthorizedException('Access restricted to ambulance users.');
    }

    if (!updatePCRDto.patientId) {
      throw new NotFoundException('Patient ID is required for PCR update.');
    }

    return this.pcrService.update(id, missionId, updatePCRDto.patientId, updatePCRDto);
  }

  @Get('patient/:patientId')
  async getPCRidByPatient(
    @Param('patientId', ParseIntPipe) patientId: number,
    @Param('missionId', ParseIntPipe) missionId: number,
  ) {
    console.log("patientID");
    return this.pcrService.getPCRidByPatientID(patientId, missionId);
}


  @Get()
  async findAll(@Param('missionId', ParseIntPipe) missionId: number) {
    return this.pcrService.findAllForMission(missionId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('missionId', ParseIntPipe) missionId: number,
  ) {
    const pcr = await this.pcrService.findOneForMission(id, missionId);
    if (!pcr) throw new NotFoundException(`PCR with ID ${id} not found for this mission.`);
    return pcr;
  }
}
