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

   // Extract prediction inputs from primary assessment
   private extractPredictionInputs(primaryAssessment: any): PredictionInput | null {
    try {
      // Assuming the primary assessment JSON has these specific fields
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

  // Send prediction inputs to AI service and get triage
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

    // Try to get prediction inputs and triage
    try {
      // Extract prediction inputs from primary assessment
      const predictionInputs = this.extractPredictionInputs(pcr.primary_assessment);
      
      if (predictionInputs) {
        // Get triage prediction from AI service
        const triage = await this.getPredictedTriage(predictionInputs);
        
        // Map triage to numerical value if needed
        const triageMap = {
          'green': 0,
          'yellow': 1,
          'orange': 2,
          'red': 3
        };
        
        // Add triage to the PCR
        pcr.triage = triageMap[triage];
      }
    } catch (error) {
      console.error('Error processing triage prediction:', error);
      // Optionally, you might want to log this or handle it differently
    }

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
