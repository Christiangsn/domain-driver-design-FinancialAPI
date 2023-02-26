import { type BudgetDescriptionValueObject } from './../valueObjects/budgetDescriptionValueObject'
import { type BaseDomainEntity, Entity, Result, type UniqueEntityID } from '@domain/shared'

type IReasonDomainEntityProps = { description: BudgetDescriptionValueObject } & BaseDomainEntity
export class ReasonDomainEntity extends Entity<IReasonDomainEntityProps> {
  private constructor (props: IReasonDomainEntityProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public get id (): UniqueEntityID { return this._id }
  public get description (): BudgetDescriptionValueObject { return this.props.description }
  public static create (props: IReasonDomainEntityProps, id?: UniqueEntityID): Result<ReasonDomainEntity> {
    return Result.ok<ReasonDomainEntity>(new ReasonDomainEntity(props, id))
  }
}
