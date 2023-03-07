/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TermType } from './termType'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserType {
  @Field(() => ID)
  public id!: string

  @Field(() => [TermType]!, { nullable: true })
  public terms!: TermType[]

  @Field(() => String)
  public email!: string
}
