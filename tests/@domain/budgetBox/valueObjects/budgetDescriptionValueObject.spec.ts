import { BudgetescriptionValueObject } from '@domain/budgetBox'

describe('DescriptionValueObject', () => {
  it('Should create a valid descrption value object', () => {
    const descriptionValueObject = BudgetescriptionValueObject.create('valid_description')
    expect(descriptionValueObject.isSuccess).toBe(true)
  })

  it('Should normalize description to lowercase ', () => {
    const descriptionValueObject = BudgetescriptionValueObject.create('valiD_deSCripTIon')
    expect(descriptionValueObject.isSuccess).toBe(true)
    expect(descriptionValueObject.getResult().value).toBe('valid_description')
  })

  it('Should fail if provide less than one char', () => {
    const descriptionValueObject = BudgetescriptionValueObject.create('Should fail if provide less than one char')
    expect(descriptionValueObject.isFailure).toBe(true)
    expect(descriptionValueObject.error).toBe('Invalid description: lenght min 1 and max length 30')
  })

  it('Should fail if not provide descriptionr', () => {
    const descriptionValueObject = BudgetescriptionValueObject.create(' ')
    expect(descriptionValueObject.isFailure).toBe(true)
    expect(descriptionValueObject.error).toBe('Invalid description: lenght min 1 and max length 30')
  })
})
