import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SignUpInput {
  @Field(() => String)
  public email!: string

  @Field(() => String)
  public password!: string

  @Field(() => String)
  public ip!: string

  @Field(() => Boolean)
  public acceptedTerms!: boolean
}
