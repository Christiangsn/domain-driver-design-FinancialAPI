import { type OS } from '@domain/user'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { type Document } from 'mongoose'

type IUserAgent = {
  name: string
  version: string
  os: keyof typeof OS
  type: string
}

type ITermsTypes = {
  ip: string
  acceptedAt: Date
  userAgent: IUserAgent
}
export type UserDocument = User & Document

@Schema({
  autoCreate: true,
  timestamps: true,
  autoIndex: true
})
export class User {
  @Prop({ immutable: true, required: true, type: String, index: true })
  public readonly id!: string

  @Prop({ required: true, index: true, type: String })
  public email!: string

  @Prop({ required: true, type: String })
  public password!: string

  @Prop({ type: Array<ITermsTypes>, required: true })
  public terms!: ITermsTypes[]

  @Prop({ type: Date, required: true, default: new Date() })
  public createdAt!: Date

  @Prop({ type: Date, required: true, default: new Date() })
  public updatedAt!: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
