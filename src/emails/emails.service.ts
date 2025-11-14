import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import {
  EmailVerification,
  EmailVerificationDocument,
} from './schemas/emailVerification';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EmailsService {
  constructor(
    @InjectModel(EmailVerification.name)
    private emailVerificationModel: Model<EmailVerificationDocument>,
  ) {}

  async sendVerificationEmail(email: string) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const token = Math.floor(1000 + Math.random() * 9000);
    await this.emailVerificationModel.create({ email, code: token.toString() });
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Your verification code',
        html: `<p>Your verification code is <strong>${token}</strong></p>`,
      });
    } catch (err: unknown) {
      return err;
    }
  }
  async verifyEmailCode(email: string, code: string) {
    const record = await this.emailVerificationModel.findOne({ email, code });
    if (record) {
      await this.emailVerificationModel.deleteOne({ _id: record._id });
      return { verified: true, message: 'Email verified successfully' };
    } else {
      return { verified: false, message: 'Invalid verification code' };
    }
  }
}
