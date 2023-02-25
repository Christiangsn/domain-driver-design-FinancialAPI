import { Result, ValueObject } from '@domain/shared'

type IDescriptionValueObjectProps = { value: string }
export class DescriptionValueObject extends ValueObject<IDescriptionValueObjectProps> {
  private constructor (props: IDescriptionValueObjectProps) {
    super(props)
  }

  public get value (): string { return this.props.value }
  public static create (description: string): Result<DescriptionValueObject> {
    const isValidLength = description.length <= 1 || description.length >= 30
    if (isValidLength) return Result.fail('Invalid description: lenght min 1 and max length 30')
    return Result.ok<DescriptionValueObject>(new DescriptionValueObject({ value: description.toLocaleLowerCase().trim() }))
  }
}
