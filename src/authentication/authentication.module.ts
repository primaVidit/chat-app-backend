import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './guards/local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, SessionSerializer],
})
export class AuthenticationModule {}
