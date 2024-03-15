import { Body, ConsoleLogger, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationService } from './authentication.service';

@Controller('register')
export class AuthenticationController {

    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post()
    registerUser(@Body() createUserDto: CreateUserDto) {
        const newUser = this.authenticationService.create(createUserDto);
        console.log("newwUserDetails", newUser);
        return this.authenticationService.create(createUserDto);
    }
}
