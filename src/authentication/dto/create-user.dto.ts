import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  readonly emailAddress: string;
}
