import { IsString, IsEnum, IsOptional, IsNumber, IsJSON } from 'class-validator';

export class MissionDto {
  @IsEnum(['emergency', 'transportation'])
  mission_type: 'emergency' | 'transportation';

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsNumber()
  @IsOptional()
  ambulanceId?: number;

  @IsEnum(['pending', 'active', 'completed', 'canceled'])
  @IsOptional()
  status?: 'pending' | 'active' | 'completed' | 'canceled';

  @IsJSON()
  @IsOptional()
  images?: any;

  @IsNumber()
  @IsOptional()
  patient_count?: number;

  @IsOptional()
  canceled_at?: Date;

  @IsOptional()
  completed_at?: Date;
}
