import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticationService } from "./authentication.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthenticationService) {
        console.log('hello');
        super();
    }

    async validate(email: string, password: string): Promise<any> {
        console.log("<<2>>");
        const emailAddress = email.toLowerCase();
        const user = await this.authService.validateUser(emailAddress, password);

        if (!user) {
            throw new HttpException('Not authorized', HttpStatus.BAD_REQUEST);
        }
        return user;
    }
}