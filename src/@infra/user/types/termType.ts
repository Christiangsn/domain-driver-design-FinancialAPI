import { OS } from '@domain/user'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'

registerEnumType(OS, {
  name: 'OS'
})

@ObjectType()
export class UserAgentType {
  @Field(() => String)
  public name!: string

  @Field(() => String)
  public version!: string

  @Field(() => OS)
  public os!: keyof typeof OS

  @Field(() => String)
  public type!: string
}

@ObjectType()
export class TermType {
  @Field(() => String)
  public ip!: string

  @Field(() => String)
  public acceptedAt!: Date

  @Field(() => UserAgentType)
  public userAgent!: UserAgentType
}
