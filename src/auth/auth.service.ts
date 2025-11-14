import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { randomUUID } from 'crypto';
import { EmailsService } from '../emails/emails.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private emailsService: EmailsService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const newUser = new this.userModel(createAuthDto);
      newUser.userId = randomUUID();
      const userData = await newUser.save();
      await this.emailsService.sendVerificationEmail(userData.email);
      return {
        message: 'New user created',
        data: userData,
      };
    } catch (err: unknown) {
      return err;
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    console.log(updateAuthDto);
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async verifyEmailCode(email: string, code: string) {
    try {
      const response = await this.emailsService.verifyEmailCode(email, code);
      if (response.verified) {
        await this.userModel.findOneAndUpdate({
          emailVerified: true,
        });
        return {
          message: 'Email verified.',
          status: true,
        };
      } else {
        return response;
      }
    } catch (error: unknown) {
      return error;
    }
  }
}
