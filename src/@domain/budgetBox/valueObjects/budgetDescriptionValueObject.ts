import { Result, ValueObject } from '@domain/shared'

type IBudgetescriptionValueObjectProps = { value: string }
export class BudgetescriptionValueObject extends ValueObject<IBudgetescriptionValueObjectProps> {
  private constructor (props: IBudgetescriptionValueObjectProps) {
    super(props)
  }

  public get value (): string { return this.props.value }
  public static create (description: string): Result<BudgetescriptionValueObject> {
    const isValidLength = description.length <= 1 || description.length >= 30
    if (isValidLength) return Result.fail('Invalid description: lenght min 1 and max length 30')
    return Result.ok<BudgetescriptionValueObject>(new BudgetescriptionValueObject({ value: description.toLocaleLowerCase().trim() }))
  }
}
