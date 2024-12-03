import { IsOptional, IsJSON, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


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
  missionId?: number;

  @IsOptional()
  @IsNumber()
  patientId?: number;
}


export class UpdatePCRDto extends PartialType(CreatePCRDto) {}
