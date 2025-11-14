import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class CreateAuthDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsString()
  readonly displayName?: string;
}
