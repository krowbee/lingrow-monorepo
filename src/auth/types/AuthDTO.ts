/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDTO {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class RegisterDTO {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class LogoutDTO {
  @Expose()
  @IsString()
  refreshToken: string;
}

export class UserDTO {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEmail()
  email: string;
}
