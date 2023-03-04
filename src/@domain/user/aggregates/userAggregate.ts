import { type BudgetIdValueObject } from '@domain/budgetBox'
import { type UniqueEntityID } from '../../shared/core/uniqueEntityID'
import { AggregateRoot } from '@domain/shared/core/aggregateRoot'
import { type EmailValueObject } from '../valueObjects/emailValueObject'
import { type PasswordValueObject } from '../valueObjects/passwordValueObject'
import { type TermsValueObject } from '../valueObjects/termsValueObject'
import { type BaseDomainEntity, Result } from '@domain/shared/core'

type IUserAggregateProps = {
  email: EmailValueObject
  password: PasswordValueObject
  budgetBoxIds?: BudgetIdValueObject[]
  totalBalanceAvaliable: number
  terms: TermsValueObject[]
} & BaseDomainEntity

/**
 * @var email 'EmailValueObject'
 * @var password 'PasswordValueObject'
 * @var budgetBoxIds 'BudgetIdValueObject[]'
 * @var totalBalanceAvaliable 'number'
 * @var budgetBoxIds 'TermValueObject[]'
 */
export class UserAggregate extends AggregateRoot<IUserAggregateProps> {
  private constructor (props: IUserAggregateProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public get email (): EmailValueObject { return this.props.email }
  public get password (): PasswordValueObject { return this.props.password }
  public get budgetBoxIds (): BudgetIdValueObject[] { return this.props.budgetBoxIds ?? [] }
  public get terms (): TermsValueObject[] { return this.props.terms }
  public get totalBalanceAvaliable (): number { return this.props.totalBalanceAvaliable }
  public get deletedAt (): Date { return this.props.deletedAt ?? new Date() }

  public static create (props: IUserAggregateProps, id?: UniqueEntityID): Result<UserAggregate> {
    return Result.ok<UserAggregate>(new UserAggregate(props, id))
  }
}
