import { BudgetIdValueObject } from '@domain/budgetBox'
import { UniqueEntityID } from '@domain/shared/core'
import { TransactionCalculationValueObject } from '@domain/transaction'

describe('TransactionCalculationValueObject', () => {
  it('Should create a valid calculation', () => {
    const calculation = TransactionCalculationValueObject.create({
      budgetBoxID: BudgetIdValueObject.create(new UniqueEntityID('valid_budget_id')).getResult(),
      monetaryValue: 200
    })
    expect(calculation.isSuccess).toBe(true)
    expect(calculation.isFailure).toBe(false)
    expect(calculation.getResult().value.monetaryValue).toBe(200)
    expect(calculation.getResult().value.budgetBoxID.id.toValue()).toBe('valid_budget_id')
  })

  it('Should fail if provide a negative number', () => {
    const calculation = TransactionCalculationValueObject.create({
      budgetBoxID: BudgetIdValueObject.create(new UniqueEntityID('valid_budget_id')).getResult(),
      monetaryValue: -100
    })
    expect(calculation.isSuccess).toBe(false)
    expect(calculation.isFailure).toBe(true)
    expect(calculation.error).toBe('Value should be positive')
  })
})
