import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PCR } from './pcr.entity';
import { Mission } from '../missions/missions.entity';
import { CreatePCRDto } from './pcr.dto';

@Injectable()
export class PCRService {
  constructor(
    @InjectRepository(PCR)
    private pcrRepository: Repository<PCR>,
    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,
  ) {}

  async create(missionId: number, createPCRDto: CreatePCRDto): Promise<PCR> {
    const mission = await this.missionRepository.findOne({ where: { id: missionId } });
    if (!mission) throw new NotFoundException(`Mission with ID ${missionId} not found`);

    const pcr = new PCR();
    pcr.mission = mission;
    pcr.primary_assessment = createPCRDto.primary_assessment;
    pcr.body_section = createPCRDto.body_section;
    pcr.vitals = createPCRDto.vitals;
    pcr.management = createPCRDto.management;
    pcr.clinical_info = createPCRDto.clinical_info;
    pcr.patient_details = createPCRDto.patient_details;

    return this.pcrRepository.save(pcr);
  }

  async findAllForMission(missionId: number): Promise<PCR[]> {
    return this.pcrRepository.find({
      where: { mission: { id: missionId } },
      relations: ['mission'],
    });
  }

  async findOneForMission(id: number, missionId: number): Promise<PCR | null> {
    return this.pcrRepository.findOne({
      where: { id, mission: { id: missionId } },
      relations: ['mission'],
    });
  }
}
