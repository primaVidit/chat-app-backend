import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb+srv://viditkhandelwal:vidit1234@cluster0.6niw3km.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    PassportModule.register({ session: true }),
    AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [PassportModule]
})
export class AppModule {}
