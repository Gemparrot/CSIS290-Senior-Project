import { IsEnum, IsOptional, IsNumber } from 'class-validator';

export class VehicleCheckupDto {
  @IsNumber()
  @IsOptional()
  ambulanceId?: number;

  @IsEnum(['checked', 'unchecked'])
  is_checked: 'checked' | 'unchecked';
}
