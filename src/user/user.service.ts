import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}
  async insertUser(
    userName: string,
    password: string,
    company: string,
    role: string,
  ) {
    const username = userName.toLowerCase();
    const newUser = new this.userModel({
      username,
      password,
      company,
      role,
    });
    await newUser.save();
    return newUser;
  }

  async getUser(userName: string) {
    const username = userName.toLowerCase();
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteOne(query: any): Promise<void> {
    try {
      await this.userModel.deleteOne(query).exec();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
