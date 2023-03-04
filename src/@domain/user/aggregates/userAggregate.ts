import { type UniqueEntityID } from '../../shared/core/uniqueEntityID'
import { AggregateRoot } from '@domain/shared/core/aggregateRoot'
import { type EmailValueObject } from '../valueObjects/emailValueObject'
import { type PasswordValueObject } from '../valueObjects/passwordValueObject'
import { type TermsValueObject } from '../valueObjects/termsValueObject'
import { type BaseDomainEntity, Result } from '@domain/shared/core'

type IUserAggregateProps = {
  email: EmailValueObject
  password: PasswordValueObject
  terms: TermsValueObject[]
} & BaseDomainEntity

/**
 * @var email 'EmailValueObject'
 * @var password 'PasswordValueObject'
 * @var terms 'TermValueObject[]'
 */
export class UserAggregate extends AggregateRoot<IUserAggregateProps> {
  private constructor (props: IUserAggregateProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public get email (): EmailValueObject { return this.props.email }
  public get password (): PasswordValueObject { return this.props.password }
  public get terms (): TermsValueObject[] { return this.props.terms }
  public get deletedAt (): Date { return this.props.deletedAt ?? new Date() }

  public static create (props: IUserAggregateProps, id?: UniqueEntityID): Result<UserAggregate> {
    return Result.ok<UserAggregate>(new UserAggregate(props, id))
  }
}
