import { Result, type UniqueEntityID } from '@domain/shared'
import { AggregateRoot } from '@domain/shared/aggregateRoot'
import { type UserIdValueObject } from '@domain/user'
import { BudgetPercentageValueObject, type BudgetDescriptionValueObject, type ReasonDomainEntity } from '..'

type IBudgetBoxAggregateProps = {
  ownerId: UserIdValueObject
  description: BudgetDescriptionValueObject
  balanceAvaliable: number
  isPercentual: boolean
  budgetPercentage: BudgetPercentageValueObject
  reasons: ReasonDomainEntity[]
}

export class BudgetBoxAggregate extends AggregateRoot<IBudgetBoxAggregateProps> {
  private constructor (props: IBudgetBoxAggregateProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public get id (): UniqueEntityID { return this._id }
  public get ownderID (): UserIdValueObject { return this.props.ownerId }
  public get description (): BudgetDescriptionValueObject { return this.props.description }
  public get balanceAvaliable (): number { return this.props.balanceAvaliable }
  public get isPercentual (): boolean { return this.props.isPercentual }
  public get budgetPercentage (): BudgetPercentageValueObject { return this.props.budgetPercentage }
  public get reasons (): ReasonDomainEntity[] { return this.props.reasons }

  public static create (props: IBudgetBoxAggregateProps, id?: UniqueEntityID): Result<BudgetBoxAggregate> {
    if (!props.isPercentual && props.budgetPercentage.value < 100) {
      props.budgetPercentage = BudgetPercentageValueObject.create(100).getResult()
    }
    return Result.ok<BudgetBoxAggregate>(new BudgetBoxAggregate(props, id))
  }
}
