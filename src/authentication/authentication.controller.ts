import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {

    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post()
    registerUser(@Body() createUserDto: CreateUserDto) {
        return this.authenticationService.create(createUserDto);
    }
}
