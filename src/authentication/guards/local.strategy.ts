import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const emailAddress = email.toLowerCase();
    const user = await this.authService.validateUser(emailAddress, password);

    if (!user) {
      throw new HttpException('Not authorized', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
