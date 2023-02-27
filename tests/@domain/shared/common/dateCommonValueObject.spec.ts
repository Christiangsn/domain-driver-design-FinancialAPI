import { DateCommonValueObject } from '@domain/shared/common'

describe('AcceptAtValueObject', () => {
  it('Should create a valid acceptance date', () => {
    const acceptAt = DateCommonValueObject.create(new Date('2022-01-02 10:00:00'))
    expect(acceptAt.isSuccess).toBe(true)
    expect(acceptAt.getResult().value).toBe('01-02-2022 10:00:00')
  })

  it('Should fail if provide an invalid Date', () => {
    const acceptAt = DateCommonValueObject.create('invalid date' as any)
    expect(acceptAt.isFailure).toBe(true)
    expect(acceptAt.error).toBe('Invalid Date')
  })
})
