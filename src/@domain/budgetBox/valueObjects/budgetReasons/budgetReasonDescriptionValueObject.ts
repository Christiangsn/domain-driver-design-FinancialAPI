import { ErrorMessages } from '@domain/shared/common/errors'
import { Result, ValueObject } from '@domain/shared/core'

type IBudgetReasonDescriptionValueObjectProps = { value: string }
export class BudgetReasonDescriptionValueObject extends ValueObject<IBudgetReasonDescriptionValueObjectProps> {
  private constructor (props: IBudgetReasonDescriptionValueObjectProps) {
    super(props)
  }

  public get value (): string { return this.props.value }
  public static create (description: string): Result<BudgetReasonDescriptionValueObject> {
    const isValidLength = description.length <= 1 || description.length >= 30
    if (isValidLength) return Result.fail(ErrorMessages.BUDGET_INVALID_DESCRIPTION_LENGHT)
    return Result.ok<BudgetReasonDescriptionValueObject>(new BudgetReasonDescriptionValueObject({ value: description.toLocaleLowerCase().trim() }))
  }
}
