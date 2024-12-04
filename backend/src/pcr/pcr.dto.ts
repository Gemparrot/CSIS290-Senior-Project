import { IsOptional, IsJSON, IsNumber, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

// Optional: Define an enum for triage levels if you prefer
export enum TriageLevel {
  GREEN = 0,
  YELLOW = 1,
  ORANGE = 2,
  RED = 3
}

export class CreatePCRDto {
  @IsOptional()
  @IsJSON()
  body_section?: any;

  @IsOptional()
  @IsJSON()
  vitals?: any;

  @IsOptional()
  @IsJSON()
  management?: any;

  @IsOptional()
  @IsJSON()
  clinical_info?: any;

  @IsOptional()
  @IsJSON()
  patient_details?: any;

  @IsOptional()
  @IsJSON()
  primary_assessment?: any;

  @IsOptional()
  @IsNumber()
  @IsEnum(TriageLevel)
  triage?: number;

  @IsOptional()
  @IsNumber()
  missionId?: number;

  @IsOptional()
  @IsNumber()
  patientId?: number;
}

export class UpdatePCRDto extends PartialType(CreatePCRDto) {}