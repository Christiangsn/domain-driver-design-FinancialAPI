import { type BudgetIdValueObject } from '@domain/budgetBox'
import { ErrorMessages } from '@domain/shared/common/errors'
import { Result, ValueObject } from '@domain/shared/core'

type ICalculationProps = {
  budgetBoxID: BudgetIdValueObject
  monetaryValue: number
}

type ITransactionCalculationsValueObject = { value: ICalculationProps }
export class TransactionCalculationValueObject extends ValueObject<ITransactionCalculationsValueObject> {
  private constructor (props: ITransactionCalculationsValueObject) {
    super(props)
  }

  public get value (): ICalculationProps { return this.props.value }
  public static create (props: ICalculationProps): Result<TransactionCalculationValueObject> {
    const isValidValue = props.monetaryValue >= 0
    if (!isValidValue) return Result.fail<TransactionCalculationValueObject>(ErrorMessages.TRANSACTION_CALCULATION_VALUE)
    return Result.ok<TransactionCalculationValueObject>(new TransactionCalculationValueObject({ value: props }))
  }
}
