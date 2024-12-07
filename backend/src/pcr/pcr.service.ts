import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PCR } from './pcr.entity';
import { Mission } from '../missions/missions.entity';
import { CreatePCRDto, UpdatePCRDto } from './pcr.dto'; // Import both DTOs
import { MissionPatient } from '../mission-patient/mission-patient.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

interface PredictionInput {
  age: number;
  gender: number;
  blood_pressure: number;
  cholesterol: number;
  max_heart_rate: number;
  insulin: number;
  bmi: number;
}

@Injectable()
export class PCRService {
  constructor(
    @InjectRepository(PCR)
    private pcrRepository: Repository<PCR>,
    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,
    @InjectRepository(MissionPatient)
    private missionPatientRepository: Repository<MissionPatient>,
    private readonly httpService: HttpService
  ) {}

   private extractPredictionInputs(primaryAssessment: any): PredictionInput | null {
    try {
      return {
        age: primaryAssessment.age,
        gender: primaryAssessment.gender === 'male' ? 0 : 1,
        blood_pressure: primaryAssessment.blood_pressure,
        cholesterol: primaryAssessment.cholesterol,
        max_heart_rate: primaryAssessment.max_heart_rate,
        insulin: primaryAssessment.insulin,
        bmi: primaryAssessment.bmi
      };
    } catch (error) {
      console.error('Error extracting prediction inputs:', error);
      return null;
    }
  }

  private async getPredictedTriage(predictionInput: PredictionInput): Promise<string> {
    try {
      const response = await lastValueFrom(
        this.httpService.post('http://127.0.0.1:8000/predict/', predictionInput)
      );
      return response.data.triage;
    } catch (error) {
      console.error('Error getting triage prediction:', error);
      throw new Error('Failed to get triage prediction');
    }
  }

  async create(
    missionId: number,
    patientId: number,
    createPCRDto: CreatePCRDto,
  ): Promise<PCR> {
    const mission = await this.missionRepository.findOne({ where: { id: missionId } });
    if (!mission) {
      throw new NotFoundException(`Mission with ID ${missionId} not found`);
    }

    const patient = await this.missionPatientRepository.findOne({
      where: { id: patientId, mission: { id: missionId } },
    });
    if (!patient) {
      throw new NotFoundException(
        `Patient with ID ${patientId} not found or does not belong to Mission with ID ${missionId}`,
      );
    }

    const pcr = this.pcrRepository.create({
      mission,
      patient,
      ...createPCRDto,
    });

    return this.pcrRepository.save(pcr);
  }

  async update(
    id: number,
    missionId: number,
    patientId: number,
    updatePCRDto: UpdatePCRDto,
  ): Promise<PCR> {
    const pcr = await this.pcrRepository.findOne({
      where: { id, mission: { id: missionId }, patient: { id: patientId } },
      relations: ['mission', 'patient'],
    });

    if (!pcr) {
      throw new NotFoundException(
        `PCR with ID ${id} not found for Mission ID ${missionId} and Patient ID ${patientId}`,
      );
    }

    Object.assign(pcr, updatePCRDto);

    try {
      const predictionInputs = this.extractPredictionInputs(pcr.primary_assessment);
      
      if (predictionInputs) {
        const triage = await this.getPredictedTriage(predictionInputs);
        
        const triageMap = {
          'green': 0,
          'yellow': 1,
          'orange': 2,
          'red': 3
        };
        
        pcr.triage = triageMap[triage];
      }
    } catch (error) {
      console.error('Error processing triage prediction:', error);
    }

    return this.pcrRepository.save(pcr);
  }

  async getPCRidByPatientID(patientId: number, missionId: number): Promise<number | null> {
  const pcr = await this.pcrRepository.findOne({
    where: { patient: { id: patientId }, mission: { id: missionId } },
    select: ['id'], 
  });

  if (!pcr) {
    return null;  
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
