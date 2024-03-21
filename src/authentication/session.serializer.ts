import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { User } from './entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthenticationService) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: User) => void) {
    done(null, user);
  }
  async deserializeUser(user: User, done: (err: Error, user: User) => void) {
    const userDb = await this.authService.findUserById(user._id);
    return userDb ? done(null, userDb) : done(null, null);
  }
}
