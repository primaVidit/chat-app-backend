import { Body, ConsoleLogger, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { hashedPassword } from './helpers/passwordEncryption.helper';

@Controller('register')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  async registerUser(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = await hashedPassword(createUserDto.password);
    const newUser = await this.authenticationService.create(createUserDto);
    console.log(newUser);

    const { _id, firstName, lastName, emailAddress, isActive, isDeleted } =
      newUser;
    return {
      id: _id,
      firstName,
      lastName,
      emailAddress,
      isActive,
      isDeleted,
      createdAt: newUser['createdAt'],
      updatedAt: newUser['updatedAt'],
    };
  }
}
