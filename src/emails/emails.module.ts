import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import {
  EmailVerification,
  EmailVerificationSchema,
} from './schemas/emailVerification';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailVerification.name, schema: EmailVerificationSchema },
    ]),
  ],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
