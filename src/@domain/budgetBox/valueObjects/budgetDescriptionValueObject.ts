import { Result, ValueObject } from '@domain/shared'

type IBudgetDescriptionValueObjectProps = { value: string }
export class BudgetDescriptionValueObject extends ValueObject<IBudgetDescriptionValueObjectProps> {
  private constructor (props: IBudgetDescriptionValueObjectProps) {
    super(props)
  }

  public get value (): string { return this.props.value }
  public static create (description: string): Result<BudgetDescriptionValueObject> {
    const isValidLength = description.length <= 1 || description.length >= 30
    if (isValidLength) return Result.fail('Invalid description: lenght min 1 and max length 30')
    return Result.ok<BudgetDescriptionValueObject>(new BudgetDescriptionValueObject({ value: description.toLocaleLowerCase().trim() }))
  }
}
