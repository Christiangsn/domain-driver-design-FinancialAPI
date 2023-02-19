import { PasswordValueObject } from '@domain/user/valueObjects/passwordValueObject'

describe('PasswordValueObject', () => {
  it('Should create a valid password', () => {
    const password = PasswordValueObject.create('123Abc')
    expect(password.isSuccess).toBe(true)
    expect(password.getResult().value).toBe('123Abc')
  })

  it('Should fail id password is not on range 3 characteres and max 20 characteres', () => {
    const shortPassword = PasswordValueObject.create('1')
    expect(shortPassword.isFailure).toBe(true)
    expect(shortPassword.error).toBe('Password must have min 3 char and max 20 char')

    const longPassword = PasswordValueObject.create('Should fail id password is not on range 3 characteres and max 20 characteres')
    expect(longPassword.isFailure).toBe(true)
    expect(longPassword.error).toBe('Password must have min 3 char and max 20 char')
  })
})
