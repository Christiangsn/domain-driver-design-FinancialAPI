import { BudgetReasonDescriptionValueObject } from '@domain/budgetBox'

describe('BudgetReasonDescriptionValueObject', () => {
  it('Should create a valid descrption value object', () => {
    const descriptionValueObject = BudgetReasonDescriptionValueObject.create('valid_description')
    expect(descriptionValueObject.isSuccess).toBe(true)
  })

  it('Should normalize description to lowercase ', () => {
    const descriptionValueObject = BudgetReasonDescriptionValueObject.create('valiD_deSCripTIon')
    expect(descriptionValueObject.isSuccess).toBe(true)
    expect(descriptionValueObject.getResult().value).toBe('valid_description')
  })

  it('Should fail if provide less than one char', () => {
    const descriptionValueObject = BudgetReasonDescriptionValueObject.create('Should fail if provide less than one char')
    expect(descriptionValueObject.isFailure).toBe(true)
    expect(descriptionValueObject.error).toBe('Invalid description: lenght min 1 and max length 30')
  })

  it('Should fail if not provide descriptionr', () => {
    const descriptionValueObject = BudgetReasonDescriptionValueObject.create(' ')
    expect(descriptionValueObject.isFailure).toBe(true)
    expect(descriptionValueObject.error).toBe('Invalid description: lenght min 1 and max length 30')
  })
})