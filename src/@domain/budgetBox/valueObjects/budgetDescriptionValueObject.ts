import { ErrorMessages } from '@domain/shared/common/errors'
import { Result, ValueObject } from '@domain/shared/core'

type IBudgetDescriptionValueObjectProps = { value: string }
export class BudgetDescriptionValueObject extends ValueObject<IBudgetDescriptionValueObjectProps> {
  private constructor (props: IBudgetDescriptionValueObjectProps) {
    super(props)
  }

  public get value (): string { return this.props.value }
  public static create (description: string): Result<BudgetDescriptionValueObject> {
    const isValidLength = description.length <= 1 || description.length >= 30
    if (isValidLength) return Result.fail(ErrorMessages.BUDGET_DESCRIPTION_LENGHT)
    return Result.ok<BudgetDescriptionValueObject>(new BudgetDescriptionValueObject({ value: description.toLocaleLowerCase().trim() }))
  }
}
