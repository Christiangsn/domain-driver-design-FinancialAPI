import { BudgetPercentageValueObject } from '@domain/budgetBox/valueObjects/budgetPercentageValueObject'

describe('BudgetPercentageValueObject', () => {
  it('Should create a valid percentage', () => {
    const percentage = BudgetPercentageValueObject.create(70)
    expect(percentage.isSuccess).toBe(true)
    expect(percentage.getResult().value).toBe(70)
  })

  it('Should create a valid percentage', () => {
    const percentage = BudgetPercentageValueObject.create(170)
    expect(percentage.isSuccess).toBe(false)
    expect(percentage.error).toBe('Invalid Range Value')
  })

  it('Should fail if provide a number less than 0', () => {
    const percentage = BudgetPercentageValueObject.create(-1)
    expect(percentage.isSuccess).toBe(false)
    expect(percentage.error).toBe('Invalid Range Value')
  })
})
