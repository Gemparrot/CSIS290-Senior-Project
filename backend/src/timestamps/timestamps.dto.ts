import { IsEnum, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTimestampDto {
  @IsEnum(['departure_to_case', 'arrival_to_case', 'departure_to_destination', 'arrival_to_destination', 'unit_available', 'arrival_to_station'])
  @IsNotEmpty()
  event: string;

  @IsDate()
  @IsNotEmpty()
  timestamp: Date;
}
