import { ReasonIdValueObject } from '@domain/budgetBox'
import { UniqueEntityID } from '@domain/shared/core'

describe('BudgetReasonIDValueObject', () => {
  it('Should create a valid reasonID', () => {
    const reasonId = ReasonIdValueObject.create()
    expect(reasonId.isSuccess).toBe(true)
    expect(reasonId.getResult().id.toValue).toBeDefined()
  })

  it('Should create a valid reasonId with value', () => {
    const reasonId = ReasonIdValueObject.create(new UniqueEntityID('valid_id'))
    expect(reasonId.isSuccess).toBe(true)
    expect(reasonId.getResult().id.toValue).toBeDefined()
  })
})
