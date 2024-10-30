import { IsEmail, IsString, Length } from 'class-validator';

export class AdminRegisterDto {
  @IsString()
  @Length(4, 50)
  username: string;

  @IsString()
  @Length(8, 50)
  password: string;

  @IsEmail()
  email: string;
}

export class AdminLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 50)
  password: string;
}
