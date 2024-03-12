import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUserById(id: string) {
    const user = await this.userModel.findById({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`This user does not exists`);
    }
    return user;
  }

  async findUserByEmailAddress(emailAddress: string): Promise<Boolean> {
    const isUserExists = await this.userModel
      .findOne({
        emailAddress,
      })
      .exec();

    if (!isUserExists) {
      return false;
    }

    return true;
  }

  async create(createUserDto: CreateUserDto) {
    const isUserAlreadyExists = await this.findUserByEmailAddress(createUserDto.emailAddress);
    if (isUserAlreadyExists) {
        throw new ConflictException('This user already exists.');
    }
    const user = new this.userModel(createUserDto);
    return user.save();
  }
}
