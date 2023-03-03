import { ErrorMessages } from '@domain/shared/common/errors'
import { Result, ValueObject } from '@domain/shared/core'

type ITransactionNoteValueObjectProps = { value: string }
export class TransactionNoteValueObject extends ValueObject<ITransactionNoteValueObjectProps> {
  private constructor (props: ITransactionNoteValueObjectProps) {
    super(props)
  }

  public get value (): string { return this.props.value.trim() }
  public static create (value: string): Result<TransactionNoteValueObject> {
    const isValidLength = value.trim().length < 144
    if (!isValidLength) return Result.fail<TransactionNoteValueObject>(ErrorMessages.TRANSACTION_INVALID_NOTE_LENGHT)
    return Result.ok<TransactionNoteValueObject>(new TransactionNoteValueObject({ value: value.trim() }))
  }
}
