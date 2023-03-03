/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type TransactionNoteValueObject, type StatusTransactionValueObject, type TransactionTypeValueObject, type AttachmentValueObject, type TransactionCalculationValueObject } from '@domain/transaction'
import { type DateCommonValueObject } from '../../shared/common/valueObjects/dateCommonValueObject'

import { type ReasonIdValueObject } from '@domain/budgetBox'
import { type UserIdValueObject } from '@domain/user'
import { Result, type UniqueEntityID } from '@domain/shared/core'

import { AggregateRoot } from '@domain/shared/core/aggregateRoot'

type ITransactionAggregateRootProps = {
  userId: UserIdValueObject
  reasonId: ReasonIdValueObject
  paymentDate: DateCommonValueObject
  transactionType: TransactionTypeValueObject
  status: StatusTransactionValueObject
  note?: TransactionNoteValueObject
  attachment?: AttachmentValueObject
  transactionCalculations: TransactionCalculationValueObject[]
}

export class TransactionAggregate extends AggregateRoot<ITransactionAggregateRootProps> {
  #total: number = 0
  #calculateTotal (): void {
    this.#total = this.props.transactionCalculations.reduce((total, calc) => calc.value.monetaryValue + total, 0)
  }

  private constructor (props: ITransactionAggregateRootProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public get totalValue (): number { return this.#total }
  public get userId (): UserIdValueObject { return this.props.userId }
  public get reasonId (): ReasonIdValueObject { return this.props.reasonId }
  public get paymentDate (): DateCommonValueObject { return this.props.paymentDate }
  public get transactionType (): TransactionTypeValueObject { return this.props.transactionType }
  public get status (): StatusTransactionValueObject { return this.props.status }
  public get note (): TransactionNoteValueObject | null { return this.props?.note ?? null }
  public get attachment (): AttachmentValueObject | null { return this.props?.attachment ?? null }
  public get transactionCalculations (): TransactionCalculationValueObject[] { return this.props.transactionCalculations }

  public static create (props: ITransactionAggregateRootProps, id?: UniqueEntityID): Result<TransactionAggregate> {
    const transaction = new TransactionAggregate(props, id)
    transaction.#calculateTotal()
    return Result.ok<TransactionAggregate>(transaction)
  }
}
