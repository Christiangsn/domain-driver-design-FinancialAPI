import { UniqueEntityID } from '@domain/shared/core'
import { UserIdValueObject } from '@domain/user/valueObjects/userIdValueObject'

describe('UserIdValueObject', () => {
  it('Should create a valid userId', () => {
    const userId = UserIdValueObject.create()
    expect(userId.isSuccess).toBe(true)
  })

  it('Should create a valid userId with value', () => {
    const userId = UserIdValueObject.create(new UniqueEntityID('valid_id'))
    expect(userId.isSuccess).toBe(true)
    expect(userId.getResult().id.toValue()).toEqual('valid_id')
  })
})
