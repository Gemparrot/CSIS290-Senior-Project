import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PCR } from './pcr.entity';
import { Mission } from '../missions/missions.entity';
import { CreatePCRDto, UpdatePCRDto } from './pcr.dto'; // Import both DTOs
import { MissionPatient } from '../mission-patient/mission-patient.entity';

@Injectable()
export class PCRService {
  constructor(
    @InjectRepository(PCR)
    private pcrRepository: Repository<PCR>,
    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,
    @InjectRepository(MissionPatient)
    private missionPatientRepository: Repository<MissionPatient>,
  ) {}

  async create(
    missionId: number,
    patientId: number,
    createPCRDto: CreatePCRDto,
  ): Promise<PCR> {
    // Validate mission existence
    const mission = await this.missionRepository.findOne({ where: { id: missionId } });
    if (!mission) {
      throw new NotFoundException(`Mission with ID ${missionId} not found`);
    }

    // Validate patient existence and association with the mission
    const patient = await this.missionPatientRepository.findOne({
      where: { id: patientId, mission: { id: missionId } },
    });
    if (!patient) {
      throw new NotFoundException(
        `Patient with ID ${patientId} not found or does not belong to Mission with ID ${missionId}`,
      );
    }

    // Create PCR entity
    const pcr = this.pcrRepository.create({
      mission,
      patient,
      ...createPCRDto,
    });

    // Save and return the PCR
    return this.pcrRepository.save(pcr);
  }

  async update(
    id: number,
    missionId: number,
    patientId: number,
    updatePCRDto: UpdatePCRDto,
  ): Promise<PCR> {
    // Validate PCR existence
    const pcr = await this.pcrRepository.findOne({
      where: { id, mission: { id: missionId }, patient: { id: patientId } },
      relations: ['mission', 'patient'],
    });

    if (!pcr) {
      throw new NotFoundException(
        `PCR with ID ${id} not found for Mission ID ${missionId} and Patient ID ${patientId}`,
      );
    }

    // Update the PCR entity with new data
    Object.assign(pcr, updatePCRDto);

    // Save and return the updated PCR
    return this.pcrRepository.save(pcr);
  }

  async getPCRidByPatientID(patientId: number, missionId: number): Promise<number | null> {
  // Find the PCR record by patientId and missionId
  const pcr = await this.pcrRepository.findOne({
    where: { patient: { id: patientId }, mission: { id: missionId } },
    select: ['id'], // Only select the 'id' field of the PCR record
  });

  if (!pcr) {
    return null;  // Or you can return some other value, like a custom message
  }

  return pcr.id;
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
