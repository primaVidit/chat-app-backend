import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { hashedPassword } from './helpers/passwordEncryption.helper';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = await hashedPassword(createUserDto.password);
    const newUser = await this.authenticationService.create(createUserDto);

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login() {
    return "Logged in";
  }

  @UseGuards(AuthenticatedGuard)
  @Get('pin')
  checkConnection(@Request() req): string {
    return req.user;
  }

  // async login(@Body() loginUserDto: LoginUserDto) {
  //   const user = await this.authenticationService.findUserByEmail(
  //     loginUserDto.emailAddress,
  //   );
  //   const isPasswordCorrect = await verifyPassword(
  //     user.password,
  //     loginUserDto.password,
  //   );

  //   if (!isPasswordCorrect) {
  //     throw new HttpException(
  //       'Incorrect passowrd, please enter correct password',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   const { _id, firstName, lastName, emailAddress, isActive, isDeleted } =
  //     user;
  //   return {
  //     id: _id,
  //     firstName,
  //     lastName,
  //     emailAddress,
  //     isActive,
  //     isDeleted,
  //     createdAt: user['createdAt'],
  //     updatedAt: user['updatedAt'],
  //   };
  // }
}
