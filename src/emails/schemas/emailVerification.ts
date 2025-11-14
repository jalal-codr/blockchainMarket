import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailVerificationDocument = EmailVerification & Document;

@Schema({ timestamps: true })
export class EmailVerification {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  code: string;
}

export const EmailVerificationSchema =
  SchemaFactory.createForClass(EmailVerification);
