import { Result, ValueObject } from '@domain/shared/core'

type IPasswordValueObjectProps = {
  value: string
}
export class PasswordValueObject extends ValueObject<IPasswordValueObjectProps> {
  private constructor (props: IPasswordValueObjectProps) {
    super(props)
  }

  public get value (): string { return this.props.value }

  public static create (password: string): Result<PasswordValueObject> {
    if (password.length >= 3 && password.length <= 20) return Result.ok<PasswordValueObject>(new PasswordValueObject({ value: password }))
    else return Result.fail<PasswordValueObject>('Password must have min 3 char and max 20 char')
  }
}
