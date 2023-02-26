import { BudgetBoxAggregate, BudgetDescriptionValueObject, BudgetPercentageValueObject, BudgetReasonDescriptionValueObject, ReasonDomainEntity } from '@domain/budgetBox'
import { UserIdValueObject } from '@domain/user'

describe('BudgetBoxAggregate', () => {
  it('Should create a valid budgetBox aggregate', () => {
    const budgetBox = BudgetBoxAggregate.create({
      ownerId: UserIdValueObject.create().getResult(),
      description: BudgetDescriptionValueObject.create('Valid_description').getResult(),
      balanceAvaliable: 0,
      isPercentual: true,
      budgetPercentage: BudgetPercentageValueObject.create(20).getResult(),
      reasons: [ReasonDomainEntity.create({ description: BudgetReasonDescriptionValueObject.create('Valid_reason').getResult() }).getResult()]
    })

    expect(budgetBox.isSuccess).toBe(true)
    expect(budgetBox.isFailure).toBe(false)
    expect(budgetBox.getResult().budgetPercentage.value).toBe(20)
  })

  it('Should create a valid budgetBox aggregate with 100% if provided not percentual', () => {
    const budgetBox = BudgetBoxAggregate.create({
      ownerId: UserIdValueObject.create().getResult(),
      description: BudgetDescriptionValueObject.create('Valid_description').getResult(),
      balanceAvaliable: 0,
      isPercentual: false,
      budgetPercentage: BudgetPercentageValueObject.create(20).getResult(),
      reasons: [ReasonDomainEntity.create({ description: BudgetReasonDescriptionValueObject.create('Valid_reason').getResult() }).getResult()]
    })

    expect(budgetBox.isSuccess).toBe(true)
    expect(budgetBox.isFailure).toBe(false)
    expect(budgetBox.getResult().budgetPercentage.value).toBe(100)
  })
})
