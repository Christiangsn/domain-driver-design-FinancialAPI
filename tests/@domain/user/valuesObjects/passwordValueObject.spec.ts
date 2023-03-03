import { PasswordValueObject } from '@domain/user/valueObjects/passwordValueObject'
import { hashSync  } from 'bcrypt'

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

  it('Should create a valid encrypted password', async () => {
    const encryptedPassword = hashSync('123abc', 10)
    const password = PasswordValueObject.create(encryptedPassword)
    expect(password.isSuccess).toBe(true)
    expect(password.isFailure).toBe(false)
    expect(password.getResult().value).toBe(encryptedPassword)
  })

  it('Should create a valid password an encrypted after create', async () => {
    const password = PasswordValueObject.create('123abc')
    expect(password.isSuccess).toBe(true)
    expect(password.isFailure).toBe(false)
    expect(password.getResult().isAlreadyEncrypt).toBe(false)
    await password.getResult().encryptPassword()
    expect(password.getResult().isAlreadyEncrypt).toBe(true)
  })

  it('Should create a valid password an encrypted after create', async () => {
    const password = PasswordValueObject.create('123abc')
    expect(password.isSuccess).toBe(true)
    expect(password.isFailure).toBe(false)
    expect(password.getResult().isAlreadyEncrypt).toBe(false)
    await password.getResult().encryptPassword()
    expect(password.getResult().isAlreadyEncrypt).toBe(true)
  })
  
  it('Should compare an encripted password and return true if match', async () => {
    const password = PasswordValueObject.create('123abc')
    expect(password.isSuccess).toBe(true)
    expect(password.isFailure).toBe(false)

    const isEqualPlainText = await password.getResult().comparePassword('123abc')
    expect(isEqualPlainText).toBe(true)

    expect(password.getResult().isAlreadyEncrypt).toBe(false)
    await password.getResult().encryptPassword()
    expect(password.getResult().isAlreadyEncrypt).toBe(true)

    const isEqualEncrypted = await password.getResult().comparePassword('123abc')
    expect(isEqualEncrypted).toBe(true)
  })

  it('Should compare an encripted password and return false if does not match', async () => {
    const password = PasswordValueObject.create('123abc')
    expect(password.isSuccess).toBe(true)
    expect(password.isFailure).toBe(false)

    const isEqualPlainText = await password.getResult().comparePassword('invalid_password')
    expect(isEqualPlainText).toBe(false)

    expect(password.getResult().isAlreadyEncrypt).toBe(false)
    await password.getResult().encryptPassword()
    expect(password.getResult().isAlreadyEncrypt).toBe(true)

    const isEqualEncrypted = await password.getResult().comparePassword('invalid_password')
    expect(isEqualEncrypted).toBe(false)
  })
})
