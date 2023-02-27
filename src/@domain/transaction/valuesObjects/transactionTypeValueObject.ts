import { Result, ValueObject } from '@domain/shared/core'

enum EnumValidTransactionType {
  'ENTRADA',
  'SAIDA'
}
type IValidTransactionType = keyof typeof EnumValidTransactionType
type ITransactioNTypeValueObjectProps = { value: IValidTransactionType }

export class TransactionTypeValueObject extends ValueObject<ITransactioNTypeValueObjectProps> {
  private constructor (props: ITransactioNTypeValueObjectProps) {
    super(props)
  }

  public get value (): IValidTransactionType { return this.props.value.toUpperCase() as IValidTransactionType }
  public static create (type: IValidTransactionType): Result<TransactionTypeValueObject> {
    const isValidEnumValue = Object.values(EnumValidTransactionType).includes(type.toUpperCase())
    if (!isValidEnumValue) return Result.fail<TransactionTypeValueObject>('Invalid option')
    return Result.ok<TransactionTypeValueObject>(new TransactionTypeValueObject({ value: type }))
  }
}
