import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
  async logIn(@Req() request: any) {
    return {
      userId: request.user._id,
      emailAddress: request.user.emailAddress,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('pin')
  async checkConnection(@Req() req: any) {
    return { userId: req.user._id };
  }

  @Get('logout')
  async logout(@Req() req: any) {
    req.session.destroy();
    return 'User logged out successfully';
  }
}
