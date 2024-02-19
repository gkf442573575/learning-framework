import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto {
  @MaxLength(40)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;

  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  confirm_pwd: string;
}

export class UpdateUserNameDto {
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;
}

export class UpdateUserPwdDto {
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  old_pwd: string;

  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;

  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  confirm_pwd: string;
}

export class LoginDto {
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;
}
