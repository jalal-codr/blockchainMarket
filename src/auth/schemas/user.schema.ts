import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  displayName: string;

  @Prop()
  photoURL: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ type: Boolean, default: false })
  admin: boolean;

  @Prop({ type: Boolean, default: false })
  wallet: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
