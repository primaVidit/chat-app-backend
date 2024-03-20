import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { verifyPassword } from './helpers/passwordEncryption.helper';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  /**
   * Find user by id
   * @param id 
   * @returns User object
   */
  async findUserById(id: string) {
    const user = await this.userModel.findById({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`This user does not exists`);
    }
    return user;
  }

  /**
   * Find user by it's email address
   * @param emailAddress 
   * @returns user object
   */
  async findUserByEmail(emailAddress: string): Promise<User> {
    const user = await this.userModel.findOne({emailAddress}).exec();

    if (!user) {
      return null;
    }

    return user;
  }

  /**
   * Create a new user
   * @param createUserDto 
   * @returns Created user object
   */
  async create(createUserDto: CreateUserDto) {
    const isUserAlreadyExists = await this.findUserByEmail(createUserDto.emailAddress);
    console.log("userExists", isUserAlreadyExists);
    if (isUserAlreadyExists) {
        throw new HttpException('This user already exists.', HttpStatus.BAD_REQUEST);
    }
    //const updatedUser = {...createUserDto, isActive: true, isDeleted: false}
    const user = new this.userModel(createUserDto);
    console.log("user", user);
    return await user.save();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findUserByEmail(email);
    const isPasswordCorrect = await verifyPassword(
      user.password,
      password,
    );

    if (!user) {
      throw new HttpException('User does not exists.', HttpStatus.BAD_REQUEST)
    }

    if (user && isPasswordCorrect) {
      return {
        userId: user._id,
        emailAddress: user.emailAddress
      };
    }
    return null;

  }

  async login(): Promise<any> {
    return {
      data: 'Login successful',
      isSuccess: true
    };
  }


}
