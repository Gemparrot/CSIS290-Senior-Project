import { IsEnum, IsOptional, IsNumber } from 'class-validator';

export class EquipmentCheckupDto {
  @IsNumber()
  @IsOptional()
  ambulanceId?: number;

  @IsEnum(['checked', 'unchecked'])
  is_checked: 'checked' | 'unchecked';
}
