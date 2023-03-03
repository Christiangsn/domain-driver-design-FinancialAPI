/* eslint-disable accessor-pairs */
import { ErrorMessages } from '@domain/shared/common/errors'
import { Result, ValueObject } from '@domain/shared/core'

type IBudgetPercentageValueObjectProps = { value: number }
export class BudgetPercentageValueObject extends ValueObject<IBudgetPercentageValueObjectProps> {
  private constructor (props: IBudgetPercentageValueObjectProps) {
    super(props)
  }

  public get value () { return this.props.value }

  public static create (value: number): Result<BudgetPercentageValueObject> {
    const isValidRange = value >= 0 && value <= 100
    if (!isValidRange) return Result.fail<BudgetPercentageValueObject>(ErrorMessages.BUDGET_PORCENTAGE_INVALID_VALUE)
    return Result.ok<BudgetPercentageValueObject>(new BudgetPercentageValueObject({ value }))
  }
}
