import { type UniqueEntityID } from './../../shared/uniqueEntityID'
import { AggregateRoot } from '@domain/shared/aggregateRoot'
import { type EmailValueObject } from '../valueObjects/emailValueObject'
import { type PasswordValueObject } from '../valueObjects/passwordValueObject'
import { type TermsValueObject } from '../valueObjects/termsValueObject'
import { Result } from '@domain/shared'

type IUserAggregateProps = {
  email: EmailValueObject
  password: PasswordValueObject
  budgetBoxIds?: string[]
  totalBalanceAvaliable: number
  terms: TermsValueObject[]
}

export class UserAggregate extends AggregateRoot<IUserAggregateProps> {
  private constructor (protected readonly props: IUserAggregateProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public get email (): EmailValueObject { return this.props.email }
  public get password (): PasswordValueObject { return this.props.password }
  public get budgetBoxIds  (): string[] { return this.props.budgetBoxIds ?? [] }
  public get terms (): TermsValueObject[] { return this.props.terms } 
  public get totalBalanceAvaliable (): number { return this.props.totalBalanceAvaliable }

  public static create (props: IUserAggregateProps, id?: UniqueEntityID): Result<UserAggregate> {
    return Result.ok<UserAggregate>(new UserAggregate(props, id))
  }
}
