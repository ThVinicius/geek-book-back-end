import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { AuthType } from 'src/domain/auth/enums/auth-type.enum';
import { ICreateUserDto } from 'src/domain/user/dto/create-user.dto.interface';

export class CreateUserDto implements ICreateUserDto {
  @IsEmail()
  email: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsEnum(AuthType)
  authType: AuthType = AuthType.EMAIL;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsNotEmpty()
  password: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
