import { Result, ValueObject } from '@domain/shared'

type IBudgetPercentageValueObject = { value: number }
export class BudgetPercentageValueObject extends ValueObject<IBudgetPercentageValueObject> {
  private constructor (props: IBudgetPercentageValueObject) {
    super(props)
  }

  public get value () { return this.props.value }

  public static create (value: number): Result<IBudgetPercentageValueObject> {
    const isValidRange = value >= 0 && value <= 100
    if (!isValidRange) return Result.fail<IBudgetPercentageValueObject>('Invalid Range Value')
    return Result.ok<BudgetPercentageValueObject>(new BudgetPercentageValueObject({ value }))
  }
}
