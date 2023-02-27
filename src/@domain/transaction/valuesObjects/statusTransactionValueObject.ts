import { Result, ValueObject } from '@domain/shared/core'

enum EnumValidTransactionStatus {
  'PENDENTE',
  'CONCLUIDO'
}
type IValidTransactionStatus = keyof typeof EnumValidTransactionStatus
type IStatusTransactionValueObjectProps = { value: IValidTransactionStatus }

export class StatusTransactionValueObject extends ValueObject<IStatusTransactionValueObjectProps> {
  private constructor (props: IStatusTransactionValueObjectProps) {
    super(props)
  }

  public get value (): IValidTransactionStatus { return this.props.value.toLocaleUpperCase() as IValidTransactionStatus }
  public static create (type: string): Result<StatusTransactionValueObject> {
    const isValidEnumValue = Object.values(EnumValidTransactionStatus).includes(type.toUpperCase())
    if (!isValidEnumValue) return Result.fail<StatusTransactionValueObject>('Invalid status option')
    return Result.ok<StatusTransactionValueObject>(new StatusTransactionValueObject({ value: type as any }))
  }
}
