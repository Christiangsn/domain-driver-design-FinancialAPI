import { BudgetReasonDescriptionValueObject, ReasonDomainEntity } from '@domain/budgetBox'
import { UniqueEntityID } from '@domain/shared'

describe('Reason.domainEntity', () => {
  it('Should create a valid reason entity', () => {
    const reasonEntity = ReasonDomainEntity.create({
      description: BudgetReasonDescriptionValueObject.create('valid_description').getResult()
    })

    expect(reasonEntity.isSuccess).toBe(true)
    expect(reasonEntity.getResult().isDeleted).toBe(false)
    expect(reasonEntity.getResult().description.value).toBe('valid_description')
  })

  it('Should create valid reason entity with provided id', () => {
    const reasonEntity = ReasonDomainEntity.create({
      description: BudgetReasonDescriptionValueObject.create('valid_description').getResult()
    }, new UniqueEntityID('valid_id'))

    expect(reasonEntity.isSuccess).toBe(true)
    expect(reasonEntity.getResult().isDeleted).toBe(false)
    expect(reasonEntity.getResult().id.toValue()).toBe('valid_id')
  })
})
