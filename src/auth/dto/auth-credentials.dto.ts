import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsStrongPassword,
} from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty()
  @IsString()
  @IsStrongPassword({
    minLength: 1,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;
}
