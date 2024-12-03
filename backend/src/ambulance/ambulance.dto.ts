import { IsString, Length } from 'class-validator';

export class AmbulanceDto {
  @IsString()
  @Length(4, 50)
  vehicle_number: string;

  @IsString()
  password: string;
}

export class RegisterAmbulanceDto {
  @IsString()
  @Length(4, 50)
  vehicle_number: string;

  @IsString()
  password: string;

  adminId: number
}
