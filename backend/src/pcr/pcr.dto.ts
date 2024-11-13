import { IsNotEmpty, IsOptional, IsJSON } from 'class-validator';

export class CreatePCRDto {
  @IsOptional()
  @IsJSON()
  primary_assessment: Record<string, any>;

  @IsOptional()
  @IsJSON()
  body_section: Record<string, any>;

  @IsOptional()
  @IsJSON()
  vitals: Record<string, any>;

  @IsOptional()
  @IsJSON()
  management: Record<string, any>;

  @IsOptional()
  @IsJSON()
  clinical_info: Record<string, any>;

  @IsOptional()
  @IsJSON()
  patient_details: Record<string, any>;
}
