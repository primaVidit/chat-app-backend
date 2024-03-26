import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly emailAddress: string;

  @IsNotEmpty()
  readonly password: string;
}
