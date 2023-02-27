import { BudgetIdValueObject } from '@domain/budgetBox'
import { UniqueEntityID } from '@domain/shared/core'

describe('budgetId.value-object', () => {
  it('should create a valid budgetId', () => {
    const budgetId = BudgetIdValueObject.create()
    expect(budgetId.isSuccess).toBe(true)
    expect(budgetId.getResult().id.toValue).toBeDefined()
  })

  it('should create a valid budgetId with value', () => {
    const budgetId = BudgetIdValueObject.create(new UniqueEntityID('valid_id'))
    expect(budgetId.isSuccess).toBe(true)
    expect(budgetId.getResult().id.toValue()).toBe('valid_id')
  })
})
