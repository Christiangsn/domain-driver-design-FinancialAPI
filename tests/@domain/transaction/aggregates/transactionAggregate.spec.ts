import { AttachmentValueObject, StatusTransactionValueObject, TransactionAggregate, TransactionCalculationValueObject, TransactionNoteValueObject, TransactionTypeValueObject } from '@domain/transaction'
import { DateCommonValueObject } from '@domain/shared/common'
import { BudgetIdValueObject, ReasonIdValueObject } from '@domain/budgetBox'
import { UserIdValueObject } from '@domain/user'
import { UniqueEntityID } from '@domain/shared/core'

describe('TransactionAggregate', () => {
  it('Should create a valid transaction', () => {
    const transaction = TransactionAggregate.create({
      userId: UserIdValueObject.create().getResult(),
      reasonId: ReasonIdValueObject.create().getResult(),
      paymentDate: DateCommonValueObject.create(new Date()).getResult(),
      transactionType: TransactionTypeValueObject.create('ENTRADA').getResult(),
      status: StatusTransactionValueObject.create('PENDENTE').getResult(),
      note: TransactionNoteValueObject.create('VALID_NOTE').getResult(),
      attachment: AttachmentValueObject.create('https://aws.s3.com/bucket-askjdas56/file.pdf').getResult(),
      transactionCalculations: [
        TransactionCalculationValueObject.create({
          budgetBoxID: BudgetIdValueObject.create(new UniqueEntityID('valid_budget_id')).getResult(),
          monetaryValue: 100
        }).getResult()
      ]
    })
    expect(transaction.isSuccess).toBe(true)
  })

  it('Should create a valid transaction with updated total', () => {
    const transaction = TransactionAggregate.create({
      userId: UserIdValueObject.create().getResult(),
      reasonId: ReasonIdValueObject.create().getResult(),
      paymentDate: DateCommonValueObject.create(new Date()).getResult(),
      transactionType: TransactionTypeValueObject.create('ENTRADA').getResult(),
      status: StatusTransactionValueObject.create('PENDENTE').getResult(),
      note: TransactionNoteValueObject.create('VALID_NOTE').getResult(),
      attachment: AttachmentValueObject.create('https://aws.s3.com/bucket-askjdas56/file.pdf').getResult(),
      transactionCalculations: [
        TransactionCalculationValueObject.create({
          budgetBoxID: BudgetIdValueObject.create(new UniqueEntityID('valid_budget_id')).getResult(),
          monetaryValue: 100
        }).getResult(),
        TransactionCalculationValueObject.create({
          budgetBoxID: BudgetIdValueObject.create(new UniqueEntityID('valid_budget_id')).getResult(),
          monetaryValue: 100
        }).getResult()
      ]
    })
    expect(transaction.isSuccess).toBe(true)
    expect(transaction.getResult().totalValue).toBe(200)
  })

  it('Should create a valid transaction with provided id', () => {
    const transaction = TransactionAggregate.create({
      userId: UserIdValueObject.create().getResult(),
      reasonId: ReasonIdValueObject.create().getResult(),
      paymentDate: DateCommonValueObject.create(new Date()).getResult(),
      transactionType: TransactionTypeValueObject.create('ENTRADA').getResult(),
      status: StatusTransactionValueObject.create('PENDENTE').getResult(),
      note: TransactionNoteValueObject.create('VALID_NOTE').getResult(),
      attachment: AttachmentValueObject.create('https://aws.s3.com/bucket-askjdas56/file.pdf').getResult(),
      transactionCalculations: [
        TransactionCalculationValueObject.create({
          budgetBoxID: BudgetIdValueObject.create(new UniqueEntityID('valid_budget_id')).getResult(),
          monetaryValue: 100
        }).getResult(),
        TransactionCalculationValueObject.create({
          budgetBoxID: BudgetIdValueObject.create(new UniqueEntityID('valid_budget_id')).getResult(),
          monetaryValue: 100
        }).getResult()
      ]
    }, new UniqueEntityID('valid_transaction_id'))
    expect(transaction.isSuccess).toBe(true)
    expect(transaction.getResult().id.toValue()).toBe('valid_transaction_id')
  })
})
